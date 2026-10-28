// Nominados al Premio Defensores de la Libertad 2026.
// Las imágenes viven en src/assets/nominados_2026 y se buscan por nombre de archivo.
const imageModules = import.meta.glob<string>("@/assets/nominados_2026/*.webp", {
  eager: true,
  import: "default",
});

const image = (file: string) =>
  Object.entries(imageModules).find(([path]) => path.endsWith(`/${file}.webp`))?.[1] ?? "";

export const portadaNominados = image("01_portada_nominados");

export const FECHA_ANIVERSARIO = { es: "20 de noviembre", en: "November 20" };
export const FECHA_GALA = { es: "22 de noviembre", en: "November 22" };

export type Nominado = {
  name: string;
  image: string;
};

export type CategoriaPremio = {
  id: string;
  title: string;
  titleEn: string;
  nominados: Nominado[];
};

export const categorias: CategoriaPremio[] = [
  {
    id: "defensa-legal",
    title: "Defensa legal y derechos humanos",
    titleEn: "Legal defense and human rights",
    nominados: [
      { name: "Alianza Migratoria", image: image("03_alianza_migratoria") },
      { name: "Tocado's Law, P.A.", image: image("04_tocados_law") },
      { name: "NeoMambí", image: image("05_neomambi") },
    ],
  },
  {
    id: "excelencia-juridica",
    title: "Distinción por excelencia en la defensa jurídica",
    titleEn: "Distinction for excellence in legal defense",
    nominados: [
      { name: "Lic. Evelyn Aimee de Jesús", image: image("06_evelyn_aimee_de_jesus") },
      { name: "Lic. Lissette Tocado", image: image("07_lissette_tocado") },
      { name: "Lic. Santiago A. Alpízar", image: image("08_santiago_alpizar") },
    ],
  },
  {
    id: "liderazgo-comunitario",
    title: "Liderazgo comunitario",
    titleEn: "Community leadership",
    nominados: [
      { name: "Daimara de la Cruz", image: image("09_daimara_de_la_cruz") },
      { name: "Dayanis González", image: image("10_dayanis_gonzalez") },
      { name: "Regnier Coto", image: image("11_regnier_coto") },
    ],
  },
  {
    id: "organizacion-aliada",
    title: "Organización aliada del año",
    titleEn: "Partner organization of the year",
    nominados: [
      { name: "Iglesia Embajadores de Cristo", image: image("12_iglesia_embajadores_de_cristo") },
      { name: "Cortes Services", image: image("13_cortes_services") },
      { name: "Latino Consulting and Notary Group LLC", image: image("14_latino_consulting") },
    ],
  },
  {
    id: "periodismo",
    title: "Periodismo por la libertad y los derechos humanos",
    titleEn: "Journalism for freedom and human rights",
    nominados: [
      { name: "Arianna Colina", image: image("15_arianna_colina") },
      { name: "Liz Evora", image: image("16_liz_evora") },
      { name: "Orelvis Cabrera", image: image("18_orelvis_cabrera") },
    ],
  },
  {
    id: "emprendimiento",
    title: "Premio especial · Mención al emprendimiento",
    titleEn: "Special award · Entrepreneurship mention",
    nominados: [
      { name: "Mily Estudio Beauty Salon", image: image("17_mily_estudio_beauty_salon") },
      { name: "Sabores de Mi Tierra", image: image("19_sabores_de_mi_tierra") },
      { name: "Yaidel Álvarez (Pili)", image: image("20_yaidel_alvarez_pili") },
    ],
  },
];

export const totalNominados = categorias.reduce((n, c) => n + c.nominados.length, 0);
