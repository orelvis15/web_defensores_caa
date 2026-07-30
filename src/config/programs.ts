import { Scale, HandHeart, Flag, type LucideIcon } from "lucide-react";

// Los tres programas principales de la organización.
// Se usa en la portada, en el menú y en las páginas de cada programa,
// para que el orden y los textos se mantengan sincronizados.
export type Program = {
  slug: string;
  path: string;
  icon: LucideIcon;
  title: string;
  titleEn: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
  highlights: string[];
  highlightsEn: string[];
};

export const programs: Program[] = [
  {
    slug: "migratorio",
    path: "/programas/migratorio",
    icon: Scale,
    title: "Tema Migratorio",
    titleEn: "Immigration",
    tagline: "Ley de Ajuste Cubano y campañas",
    taglineEn: "Cuban Adjustment Act and campaigns",
    description:
      "Defendemos el cumplimiento de la Ley de Ajuste Cubano y acompañamos a las familias en sus procesos migratorios, con clínicas comunitarias, orientación y campañas públicas.",
    descriptionEn:
      "We defend full enforcement of the Cuban Adjustment Act and stand with families through their immigration processes, with community clinics, guidance, and public campaigns.",
    highlights: [
      "Ley de Ajuste Cubano",
      "Casos I-220A",
      "Clínica Migratoria Comunitaria",
      "Campañas y denuncias",
    ],
    highlightsEn: [
      "Cuban Adjustment Act",
      "I-220A cases",
      "Community Immigration Clinic",
      "Campaigns and advocacy",
    ],
  },
  {
    slug: "ayuda",
    path: "/programas/ayuda",
    icon: HandHeart,
    title: "Ayuda a Personas",
    titleEn: "Direct Assistance",
    tagline: "Asistencia a casos individuales",
    taglineEn: "Support for individual cases",
    description:
      "Atendemos caso por caso a familias en situación vulnerable: módulos de primera necesidad, seguimiento personalizado y apoyo cuando el proveedor del hogar está detenido.",
    descriptionEn:
      "We work case by case with families in vulnerable situations: essential supply modules, personalized follow-up, and support when the household provider is detained.",
    highlights: [
      "Módulos de ayuda humanitaria",
      "Seguimiento de casos",
      "Apoyo a familias de detenidos",
    ],
    highlightsEn: [
      "Humanitarian aid modules",
      "Case follow-up",
      "Support for detainees' families",
    ],
  },
  {
    slug: "libertad-cuba",
    path: "/programas/libertad-cuba",
    icon: Flag,
    title: "Libertad Cuba",
    titleEn: "Free Cuba",
    tagline: "Presos políticos, Neo Mambí y activismo",
    taglineEn: "Political prisoners, Neo Mambí, and activism",
    description:
      "Acompañamos la causa de los presos políticos cubanos y damos visibilidad a lo que ocurre en la isla, junto a las aplicaciones de Neo Mambí, las vallas y las acciones del exilio.",
    descriptionEn:
      "We stand beside the cause of Cuban political prisoners and give visibility to what happens on the island, together with the Neo Mambí apps, billboards, and actions of the exile community.",
    highlights: [
      "Presos políticos",
      "Aplicaciones Neo Mambí",
      "Vallas y campañas",
      "Caravanas y movilizaciones",
    ],
    highlightsEn: [
      "Political prisoners",
      "Neo Mambí apps",
      "Billboards and campaigns",
      "Caravans and rallies",
    ],
  },
];

export function getProgram(slug: string): Program {
  const program = programs.find((p) => p.slug === slug);
  if (!program) throw new Error(`Programa desconocido: ${slug}`);
  return program;
}
