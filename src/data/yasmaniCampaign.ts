// Datos de la campaña de Yasmani, compartidos entre la sección de la portada
// y la página con el formulario de donación.

// Identificador con el que quedan etiquetadas estas donaciones, tanto en la
// tabla campaign_donations como en la metadata de Stripe.
export const YASMANI_CAMPAIGN_ID = "yasmani-2026";

export const YASMANI_CAMPAIGN_PATH = "/campanas/yasmani";

export interface CampaignVideo {
  videoId: string;
  username: string;
  caption: { es: string; en: string };
}

// Videos de la comunidad cubana que cuentan el caso.
export const YASMANI_VIDEOS: CampaignVideo[] = [
  {
    videoId: "7677644828024376606",
    username: "karel_gonzalez",
    caption: {
      es: "Su situación explicada: entró por la frontera sin parole, está en corte de inmigración y un lipoma intracraneal le impide trabajar.",
      en: "His situation explained: he crossed the border without parole, is in immigration court, and an intracranial lipoma keeps him from working.",
    },
  },
  {
    videoId: "7678408944812903711",
    username: "cortes_services_group",
    caption: {
      es: "Cómo quedó la familia tras las cirugías y por qué la comunidad se unió para pedir ayuda.",
      en: "How the family was left after the surgeries, and why the community came together to ask for help.",
    },
  },
];
