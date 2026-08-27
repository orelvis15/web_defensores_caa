#!/usr/bin/env node
/**
 * Crea (o reutiliza) el Payment Link de Stripe para donaciones a presos políticos.
 *
 * Deja todo etiquetado para poder filtrar estas donaciones en Stripe:
 *   - Producto dedicado "Donación — Presos Políticos" con metadata.
 *   - Metadata en el propio Payment Link.
 *   - Metadata en cada PaymentIntent, que es lo que aparece en cada pago
 *     y lo que se puede exportar desde Sigma / reportes.
 *
 * Uso:
 *   STRIPE_SECRET_KEY=sk_live_xxx node scripts/stripe-presos-politicos-link.mjs
 *   STRIPE_SECRET_KEY=sk_live_xxx node scripts/stripe-presos-politicos-link.mjs --force-new
 *
 * Imprime la URL del Payment Link, que es la que se pasa a generate-qr.mjs.
 */

const CAMPAIGN_ID = "presos-politicos";
const SITE_URL = "https://defensorescaa.org";
const CURRENCY = "usd";
const PRESET_AMOUNT_CENTS = 2500; // monto sugerido: $25
const MIN_AMOUNT_CENTS = 500; // mínimo: $5
const MAX_AMOUNT_CENTS = 1_000_000; // máximo: $10,000

// Metadata que se copia al pago para poder filtrar/exportar en Stripe.
const METADATA = {
  campaign: CAMPAIGN_ID,
  designation: "political_prisoners",
  program: "libertad-cuba",
  source: "qr",
};

// La clave vive en .env.local (ignorado por git), nunca en .env, que sí está trackeado.
if (!process.env.STRIPE_SECRET_KEY) {
  try {
    process.loadEnvFile(".env.local");
  } catch {
    // Sin .env.local: se espera la clave por variable de entorno.
  }
}

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
const forceNew = process.argv.includes("--force-new");

if (!STRIPE_KEY) {
  console.error(
    "Falta STRIPE_SECRET_KEY.\n" +
      "Ponla en .env.local como STRIPE_SECRET_KEY=... o pásala por entorno:\n" +
      "  STRIPE_SECRET_KEY=sk_live_xxx node scripts/stripe-presos-politicos-link.mjs"
  );
  process.exit(1);
}

/** Convierte un objeto anidado al formato form-encoded que espera la API de Stripe. */
const toForm = (obj, prefix = "", out = new URLSearchParams()) => {
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue;
    const field = prefix ? `${prefix}[${key}]` : key;
    if (Array.isArray(value)) {
      value.forEach((item, i) => {
        if (item !== null && typeof item === "object") toForm(item, `${field}[${i}]`, out);
        else out.append(`${field}[${i}]`, String(item));
      });
    } else if (typeof value === "object") {
      toForm(value, field, out);
    } else {
      out.append(field, String(value));
    }
  }
  return out;
};

const stripe = async (method, path, body) => {
  const res = await fetch(`https://api.stripe.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${STRIPE_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Stripe-Version": "2025-08-27.basil",
    },
    body: body ? toForm(body).toString() : undefined,
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`Stripe ${method} ${path}: ${json.error?.message ?? res.status}`);
  }
  return json;
};

const findExistingLink = async () => {
  const { data } = await stripe("GET", "/v1/payment_links?limit=100");
  return data.find((link) => link.active && link.metadata?.campaign === CAMPAIGN_ID);
};

const findOrCreateProduct = async () => {
  const query = encodeURIComponent(`metadata['campaign']:'${CAMPAIGN_ID}'`);
  const { data } = await stripe("GET", `/v1/products/search?query=${query}&limit=1`);
  if (data.length > 0) {
    console.log(`Producto existente: ${data[0].id}`);
    return data[0];
  }

  const product = await stripe("POST", "/v1/products", {
    name: "Donación — Presos Políticos",
    description:
      "Donación destinada al apoyo legal y humanitario a presos políticos cubanos y sus familias.",
    metadata: METADATA,
  });
  console.log(`Producto creado: ${product.id}`);
  return product;
};

const findOrCreatePrice = async (productId) => {
  const { data } = await stripe("GET", `/v1/prices?product=${productId}&active=true&limit=100`);
  const existing = data.find((price) => price.custom_unit_amount && price.currency === CURRENCY);
  if (existing) {
    console.log(`Precio existente: ${existing.id}`);
    return existing;
  }

  // custom_unit_amount deja que el donante escriba el monto en el checkout.
  const price = await stripe("POST", "/v1/prices", {
    product: productId,
    currency: CURRENCY,
    custom_unit_amount: {
      enabled: true,
      preset: PRESET_AMOUNT_CENTS,
      minimum: MIN_AMOUNT_CENTS,
      maximum: MAX_AMOUNT_CENTS,
    },
    metadata: METADATA,
  });
  console.log(`Precio creado: ${price.id}`);
  return price;
};

const main = async () => {
  if (STRIPE_KEY.includes("_test_")) {
    console.warn("⚠️  Usando clave de PRUEBA: el QR resultante no cobrará dinero real.\n");
  }

  if (!forceNew) {
    const existing = await findExistingLink();
    if (existing) {
      console.log(`\nPayment Link ya existente (usa --force-new para crear otro):`);
      console.log(`  ${existing.id}`);
      console.log(`\n${existing.url}\n`);
      return;
    }
  }

  const product = await findOrCreateProduct();
  const price = await findOrCreatePrice(product.id);

  const link = await stripe("POST", "/v1/payment_links", {
    line_items: [{ price: price.id, quantity: 1 }],
    submit_type: "donate",
    billing_address_collection: "auto",
    metadata: METADATA,
    payment_intent_data: {
      description: "Donación — Presos Políticos (QR)",
      metadata: METADATA,
    },
    custom_text: {
      submit: {
        message:
          "Tu donación apoya a presos políticos cubanos y a sus familias con asistencia legal y humanitaria.",
      },
    },
    after_completion: {
      type: "redirect",
      redirect: { url: `${SITE_URL}/donation-success` },
    },
  });

  console.log(`Payment Link creado: ${link.id}`);
  console.log(`\n${link.url}\n`);
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
