import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, User, ShoppingBag, Home, Info, Briefcase, HandHeart, Phone, Play, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useVideoModal } from "@/contexts/VideoModalContext";
import logo from "@/assets/logo.png";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, isAdmin } = useAuth();
  const { openModal } = useVideoModal();
  const location = useLocation();

  const navLinks = [
    { href: "/", label: t("nav.home"), icon: Home },
    { href: "/about", label: t("nav.about"), icon: Info },
    { href: "/our-work", label: t("nav.ourWork"), icon: Briefcase },
    { href: "/get-involved", label: t("nav.getInvolved"), icon: HandHeart },
    { href: "https://tienda.defensorescaa.org", label: language === "ES" ? "Tienda" : "Store", icon: ShoppingBag, external: true },
    { href: "/sponsors", label: language === "ES" ? "Empresas" : "Businesses", icon: Building2, highlight: true },
    { href: "/contact", label: t("nav.contact"), icon: Phone },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-background"
      )}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img 
              src={logo} 
              alt="Defenders of the CAA and Freedom, Inc." 
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <div className="block">
              <span className="text-xs sm:text-sm md:text-base font-bold text-primary leading-tight block">
                Defenders of the CAA
              </span>
              <span className="text-xs sm:text-sm md:text-base font-bold text-primary leading-tight block">
                and Freedom, Inc.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1",
                    link.highlight
                      ? location.pathname === link.href
                        ? "text-primary-foreground bg-primary shadow-sm"
                        : "text-primary border border-primary/30 bg-primary/5 hover:bg-primary hover:text-primary-foreground"
                      : location.pathname === link.href
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Video Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={openModal}
              className="hidden sm:flex"
              title={t("header.watchVideo")}
            >
              <Play className="w-4 h-4 mr-1" />
              <span className="hidden md:inline">{t("header.watchVideo")}</span>
            </Button>

            {/* Language Toggle */}
            <div className="flex items-center bg-muted rounded-full p-0.5">
              <button
                onClick={() => setLanguage("EN")}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200",
                  language === "EN"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("ES")}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200",
                  language === "ES"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                ES
              </button>
            </div>

            {/* Login/Dashboard Button */}
            {user ? (
              <Button asChild variant="outline" size="sm" className="hidden sm:flex">
                <Link to={isAdmin ? "/admin" : "/dashboard"}>
                  <User className="w-4 h-4 mr-1" />
                  {isAdmin ? "Admin" : "Dashboard"}
                </Link>
              </Button>
            ) : (
              <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
                <Link to="/login">
                  <LogIn className="w-4 h-4 mr-1" />
                  Login
                </Link>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-background pb-4 animate-fade-in">
            <div className="flex flex-col gap-1 pt-4">
              {/* Video Button for Mobile */}
              <button
                onClick={openModal}
                className="px-4 py-3 text-base font-medium rounded-md transition-colors flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Play className="w-4 h-4" />
                {t("header.watchVideo")}
              </button>

              {navLinks.map((link) => {
                const Icon = link.icon;
                return link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 text-base font-medium rounded-md transition-colors flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "px-4 py-3 text-base font-medium rounded-md transition-colors flex items-center gap-2",
                      link.highlight
                        ? location.pathname === link.href
                          ? "text-primary-foreground bg-primary shadow-sm"
                          : "text-primary border border-primary/30 bg-primary/5"
                        : location.pathname === link.href
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
              <div className="px-4 pt-4 flex flex-col gap-2">
                {user ? (
                  <Button asChild variant="outline" className="w-full">
                    <Link to={isAdmin ? "/admin" : "/dashboard"}>
                      <User className="w-4 h-4 mr-2" />
                      {isAdmin ? "Admin Panel" : "Dashboard"}
                    </Link>
                  </Button>
                ) : (
                  <Button asChild variant="ghost" className="w-full">
                    <Link to="/login">
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
