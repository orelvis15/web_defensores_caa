# QR de donación para presos políticos

El QR apunta a un **Payment Link de Stripe** dedicado. Cada pago que entre por ahí
queda etiquetado en Stripe, así que se puede filtrar y exportar por separado del
resto de las donaciones.

## Etiquetas que quedan en Stripe

| Dónde | Campos |
| --- | --- |
| Producto | `Donación — Presos Políticos` + metadata |
| Precio | metadata (monto libre elegido por el donante) |
| Payment Link | metadata |
| **PaymentIntent (cada pago)** | `campaign=presos-politicos`, `designation=political_prisoners`, `program=libertad-cuba`, `source=qr` |

La metadata del PaymentIntent es la importante: es la que aparece en cada pago del
Dashboard y la que se puede filtrar en **Payments → Filtrar → Metadata** y exportar
en los reportes (CSV / Sigma).

## Pasos

Una sola vez:

```bash
npm install
```

### 1. Crear el Payment Link en Stripe

La `STRIPE_SECRET_KEY` **no** está en el repo: cópiala del Dashboard de Stripe
(Developers → API keys) o de los secrets de Supabase.

```bash
STRIPE_SECRET_KEY=sk_live_xxx npm run stripe:presos-link
```

El script es idempotente: si el Payment Link ya existe lo reutiliza en vez de crear
otro. Con `--force-new` crea uno nuevo. Imprime la URL, algo como
`https://donate.stripe.com/xxxxxxxx`.

Para probar sin cobrar de verdad, usa una clave `sk_test_...`.

### 2. Generar el QR

```bash
npm run qr:generate -- https://donate.stripe.com/xxxxxxxx
```

Genera:

- `public/qr/donacion-presos-politicos.svg` — vectorial, para imprenta (volantes, carteles, pancartas).
- `public/qr/donacion-presos-politicos.png` — 2048 px, para redes, PowerPoint o Word.

Opciones: `--name otro-nombre`, `--out otra/carpeta`, `--size 4096`.

## Notas

- El QR usa corrección de errores nivel **Q** (25%), que tolera dobleces, manchas y
  tinta corrida al imprimir.
- Al imprimir, deja el margen blanco que ya trae la imagen y no la pongas a menos de
  ~2,5 cm de lado; a esa escala se lee bien desde medio metro.
- El donante elige el monto en el checkout de Stripe (sugerido $25, mínimo $5).
- Al terminar el pago, Stripe redirige a `https://defensorescaa.org/donation-success`.
- El link es de **pago único**. Stripe no permite monto libre en pagos recurrentes,
  así que una versión mensual necesitaría montos fijos y un link aparte.
- Estas donaciones **no** pasan por las edge functions ni se guardan en la tabla
  `donations` de Supabase; el registro vive solo en Stripe.
