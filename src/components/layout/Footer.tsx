import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <svg
                  viewBox="0 0 40 40"
                  className="w-6 h-6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 4L6 10V20C6 28.284 12.716 35 20 38C27.284 35 34 28.284 34 20V10L20 4Z"
                    fill="white"
                    fillOpacity="0.2"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path
                    d="M15 18C17 16 20 15 23 16C25 17 26 19 25 21C24 23 21 24 18 23L14 26L16 22L15 18Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div>
                <span className="font-bold block">{t("footer.brand")}</span>
                <span className="text-sm opacity-80">{t("footer.brandSub")}</span>
              </div>
            </div>
            <p className="text-sm opacity-80 mb-4">
              {t("footer.desc")}
            </p>
            <div className="flex flex-col gap-2 text-sm opacity-80">
              <a
                href="https://maps.google.com/?q=7901+4TH+ST+N+SUITE+30525,+SAINT+PETERSBURG,+FL+33702"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:opacity-100 transition-opacity"
              >
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>7901 4TH ST N SUITE 30525, SAINT PETERSBURG, FL 33702</span>
              </a>
              <a
                href="mailto:info@defensorescaa.org"
                className="flex items-center gap-2 hover:opacity-100 transition-opacity"
              >
                <Mail className="w-4 h-4" />
                <span>info@defensorescaa.org</span>
              </a>
              <a
                href="tel:8139990195"
                className="flex items-center gap-2 hover:opacity-100 transition-opacity"
              >
                <Phone className="w-4 h-4" />
                <span>(813) 999-0195</span>
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.legal")}</h4>
            <p className="text-sm opacity-80 mb-4">
              {t("footer.legalDesc")}
            </p>
            <p className="text-xs opacity-60">
              {t("footer.legalDisclaimer")}
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-60">
            © {new Date().getFullYear()} {t("footer.brand")} {t("footer.brandSub")} {t("footer.allRights")}
          </p>
          <div className="flex gap-6 text-sm opacity-60">
            <Link to="/privacy" className="hover:opacity-100 transition-opacity">
              {t("footer.privacy")}
            </Link>
            <Link to="/terms" className="hover:opacity-100 transition-opacity">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
