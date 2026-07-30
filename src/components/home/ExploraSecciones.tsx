import { Link } from "react-router-dom";
import {
  Briefcase,
  Info,
  Newspaper,
  BookOpen,
  HandHeart,
  Building2,
  ShoppingBag,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type QuickLink = {
  href: string;
  icon: typeof Briefcase;
  label: string;
  labelEn: string;
  external?: boolean;
};

const links: QuickLink[] = [
  { href: "/our-work", icon: Briefcase, label: "Nuestro trabajo", labelEn: "Our work" },
  { href: "/about", icon: Info, label: "Quiénes somos", labelEn: "About us" },
  { href: "/blog", icon: Newspaper, label: "Noticias", labelEn: "News" },
  { href: "/resources", icon: BookOpen, label: "Recursos", labelEn: "Resources" },
  { href: "/get-involved", icon: HandHeart, label: "Participa", labelEn: "Get involved" },
  { href: "/sponsors", icon: Building2, label: "Empresas", labelEn: "Businesses" },
  {
    href: "https://tienda.defensorescaa.org",
    icon: ShoppingBag,
    label: "Tienda",
    labelEn: "Store",
    external: true,
  },
  { href: "/contact", icon: Phone, label: "Contacto", labelEn: "Contact" },
];

export function ExploraSecciones() {
  const { language } = useLanguage();
  const isSpanish = language === "ES";

  return (
    <section className="py-10 md:py-12">
      <div className="container-wide">
        <h2 className="text-lg font-semibold text-foreground mb-1 text-center">
          {isSpanish ? "Explora el sitio" : "Explore the site"}
        </h2>
        <p className="text-sm text-muted-foreground mb-6 text-center">
          {isSpanish
            ? "Accesos directos a las secciones más consultadas."
            : "Shortcuts to the most visited sections."}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {links.map((link) => {
            const Icon = link.icon;
            const label = isSpanish ? link.label : link.labelEn;
            const content = (
              <>
                <Icon className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground truncate">
                  {label}
                </span>
                {link.external && (
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground ml-auto shrink-0" />
                )}
              </>
            );

            const className =
              "flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-lg hover:border-primary/30 hover:bg-muted/50 transition-colors";

            return link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {content}
              </a>
            ) : (
              <Link key={link.href} to={link.href} className={className}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
