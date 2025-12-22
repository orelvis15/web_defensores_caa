import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Product images
import tshirtImg from "@/assets/products/tshirt.jpg";
import tumblerImg from "@/assets/products/tumbler.jpg";
import keychainImg from "@/assets/products/keychain.jpg";
import capImg from "@/assets/products/cap.jpg";
import mugImg from "@/assets/products/mug.jpg";
import sweatshirtImg from "@/assets/products/sweatshirt.jpg";
import licensePlateImg from "@/assets/products/license-plate.jpg";
import bookmarkImg from "@/assets/products/bookmark.jpg";

const products = [
  {
    id: 1,
    name: { en: "Foundation T-Shirt", es: "Camiseta de la Fundación" },
    image: tshirtImg,
    price: "$25.00",
  },
  {
    id: 2,
    name: { en: "Stainless Steel Tumbler", es: "Vaso de Acero Inoxidable" },
    image: tumblerImg,
    price: "$30.00",
  },
  {
    id: 3,
    name: { en: "Keychain", es: "Llavero" },
    image: keychainImg,
    price: "$10.00",
  },
  {
    id: 4,
    name: { en: "Trucker Cap", es: "Gorra" },
    image: capImg,
    price: "$22.00",
  },
  {
    id: 5,
    name: { en: "Coffee Mug", es: "Taza de Café" },
    image: mugImg,
    price: "$18.00",
  },
  {
    id: 6,
    name: { en: "Crewneck Sweatshirt", es: "Sudadera" },
    image: sweatshirtImg,
    price: "$45.00",
  },
  {
    id: 7,
    name: { en: "License Plate", es: "Placa de Licencia" },
    image: licensePlateImg,
    price: "$20.00",
  },
  {
    id: 8,
    name: { en: "Bookmark Set", es: "Set de Marcadores" },
    image: bookmarkImg,
    price: "$12.00",
  },
];

export default function Store() {
  const { language } = useLanguage();
  const isSpanish = language === "ES";

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Badge variant="outline" className="mb-4 border-amber-500 text-amber-600 bg-amber-50">
              <Clock className="w-3 h-3 mr-1" />
              Coming Soon
            </Badge>
            <h1 className="heading-1 text-foreground mb-6">
              {isSpanish ? "Tienda Oficial" : "Official Store"}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              {isSpanish
                ? "Apoya nuestra causa con mercancía oficial de la Fundación Defensores del CAA y la Libertad."
                : "Support our cause with official merchandise from the Defenders of the CAA and Freedom Foundation."}
            </p>
          </div>
        </div>
      </section>

      {/* Donation Notice */}
      <section className="py-8 bg-cta/5 border-y border-cta/20">
        <div className="container-wide">
          <div className="flex items-center justify-center gap-3 text-center">
            <Heart className="w-6 h-6 text-cta shrink-0" />
            <p className="text-lg font-medium text-foreground">
              {isSpanish
                ? "El 100% de las ganancias de todas las ventas se destinan directamente a la ONG y sus labores humanitarias."
                : "100% of profits from all sales go directly to the NGO and its humanitarian work."}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={isSpanish ? product.name.es : product.name.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-3 right-3 bg-amber-500 hover:bg-amber-600">
                    Coming Soon
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">
                    {isSpanish ? product.name.es : product.name.en}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      {product.price}
                    </span>
                    <Button variant="outline" size="sm" disabled className="opacity-50">
                      <ShoppingBag className="w-4 h-4 mr-1" />
                      {isSpanish ? "Próximamente" : "Soon"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="section-padding bg-section-light">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h2 className="heading-2 text-foreground mb-4">
              {isSpanish ? "¡Muy Pronto!" : "Coming Very Soon!"}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {isSpanish
                ? "Estamos preparando nuestra tienda en línea. Pronto podrás adquirir estos productos y apoyar directamente nuestra misión de defender los derechos humanos y la libertad."
                : "We're preparing our online store. Soon you'll be able to purchase these products and directly support our mission of defending human rights and freedom."}
            </p>
            <p className="text-muted-foreground">
              {isSpanish
                ? "¿Interesado en comprar? Contáctanos directamente para realizar pedidos anticipados."
                : "Interested in purchasing? Contact us directly for pre-orders."}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
