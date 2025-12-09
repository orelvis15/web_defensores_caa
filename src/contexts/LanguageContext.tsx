import { createContext, useContext, useState, ReactNode } from "react";

type Language = "EN" | "ES";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  "nav.home": { EN: "Home", ES: "Inicio" },
  "nav.about": { EN: "About", ES: "Nosotros" },
  "nav.ourWork": { EN: "Our Work", ES: "Nuestro Trabajo" },
  "nav.blog": { EN: "Blog", ES: "Blog" },
  "nav.resources": { EN: "Resources", ES: "Recursos" },
  "nav.getInvolved": { EN: "Get Involved", ES: "Participa" },
  "nav.contact": { EN: "Contact", ES: "Contacto" },
  "nav.donate": { EN: "Donate", ES: "Donar" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "EN";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
