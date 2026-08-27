import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, User, ShoppingBag, Home, Info, Briefcase, HandHeart, Phone, Building2, LayoutGrid, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { programs } from "@/config/programs";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();

  const navLinks = [
    { href: "/", label: t("nav.home"), icon: Home },
    { href: "/about", label: t("nav.about"), icon: Info },
    { href: "/our-work", label: t("nav.ourWork"), icon: Briefcase },
    {
      href: "/programas",
      label: language === "ES" ? "Programas" : "Programs",
      icon: LayoutGrid,
      dropdown: true,
    },
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
              <span className="text-xs sm:text-sm 2xl:text-base font-bold text-primary leading-tight block whitespace-nowrap">
                Defenders of the CAA
              </span>
              <span className="text-xs sm:text-sm 2xl:text-base font-bold text-primary leading-tight block whitespace-nowrap">
                and Freedom, Inc.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-0.5">
            {navLinks.map((link) => {
              if (link.dropdown) {
                const isActive = location.pathname.startsWith("/programas");
                return (
                  <DropdownMenu key={link.href}>
                    <DropdownMenuTrigger
                      className={cn(
                        "px-2.5 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 whitespace-nowrap outline-none",
                        isActive
                          ? "text-primary bg-primary/5"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64">
                      {programs.map((program) => {
                        const ProgramIcon = program.icon;
                        return (
                          <DropdownMenuItem key={program.slug} asChild>
                            <Link to={program.path} className="cursor-pointer gap-2">
                              <ProgramIcon className="w-4 h-4 text-primary shrink-0" />
                              <span className="flex flex-col">
                                <span className="font-medium">
                                  {language === "ES" ? program.title : program.titleEn}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {language === "ES" ? program.tagline : program.taglineEn}
                                </span>
                              </span>
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-2.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                    link.highlight
                      ? location.pathname === link.href
                        ? "text-primary-foreground bg-primary shadow-sm"
                        : "text-primary border border-primary/30 bg-primary/5 hover:bg-primary hover:text-primary-foreground"
                      : location.pathname === link.href
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
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
                <Link to="/dashboard">
                  <User className="w-4 h-4 mr-1" />
                  Dashboard
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
              className="xl:hidden p-2 text-foreground"
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
          <div className="xl:hidden border-t bg-background pb-4 animate-fade-in">
            <div className="flex flex-col gap-1 pt-4">
              {navLinks.map((link) => {
                const Icon = link.icon;

                if (link.dropdown) {
                  return (
                    <div key={link.href} className="pt-2">
                      <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5" />
                        {link.label}
                      </p>
                      {programs.map((program) => {
                        const ProgramIcon = program.icon;
                        return (
                          <Link
                            key={program.slug}
                            to={program.path}
                            className={cn(
                              "px-4 py-3 text-base font-medium rounded-md transition-colors flex items-center gap-2",
                              location.pathname === program.path
                                ? "text-primary bg-primary/5"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            )}
                          >
                            <ProgramIcon className="w-4 h-4" />
                            {language === "ES" ? program.title : program.titleEn}
                          </Link>
                        );
                      })}
                    </div>
                  );
                }

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
                    <Link to="/dashboard">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
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
