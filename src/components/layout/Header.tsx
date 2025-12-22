import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, User, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/our-work", label: t("nav.ourWork") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/resources", label: t("nav.resources") },
    { href: "/get-involved", label: t("nav.getInvolved") },
    { href: "/store", label: language === "ES" ? "Tienda" : "Store", comingSoon: true },
    { href: "/contact", label: t("nav.contact") },
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
            <div className="hidden sm:block">
              <span className="text-sm md:text-base font-bold text-primary leading-tight block">
                Defenders of the CAA
              </span>
              <span className="text-xs text-muted-foreground">
                and Freedom, Inc.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1",
                  location.pathname === link.href
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.comingSoon && <ShoppingBag className="w-3.5 h-3.5" />}
                {link.label}
                {link.comingSoon && (
                  <Badge variant="outline" className="ml-1 text-[10px] px-1.5 py-0 h-4 border-amber-500 text-amber-600 bg-amber-50">
                    Soon
                  </Badge>
                )}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-4">
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

            {/* Donate Button */}
            <Button asChild variant="cta" size="sm" className="hidden sm:flex">
              <Link to="/take-action">{t("nav.donate")}</Link>
            </Button>

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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-4 py-3 text-base font-medium rounded-md transition-colors flex items-center gap-2",
                    location.pathname === link.href
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.comingSoon && <ShoppingBag className="w-4 h-4" />}
                  {link.label}
                  {link.comingSoon && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-amber-500 text-amber-600 bg-amber-50">
                      Soon
                    </Badge>
                  )}
                </Link>
              ))}
              <div className="px-4 pt-4 flex flex-col gap-2">
                <Button asChild variant="cta" className="w-full">
                  <Link to="/take-action">{t("nav.donate")}</Link>
                </Button>
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
