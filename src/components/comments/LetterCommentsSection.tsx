import { MessageSquare } from "lucide-react";
import { CommentForm } from "./CommentForm";
import { ApprovedComments } from "./ApprovedComments";
import { useLanguage } from "@/contexts/LanguageContext";

export function LetterCommentsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container-wide">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full">
              <MessageSquare className="w-4 h-4" />
              {t("lang") === "es" ? "OPINIONES DE LA COMUNIDAD" : "COMMUNITY OPINIONS"}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {t("lang") === "es" 
              ? "¿Qué opinas de la carta?" 
              : "What do you think about the letter?"}
          </h2>
          <p className="text-muted-foreground">
            {t("lang") === "es"
              ? "Comparte tu opinión sobre nuestra carta a los representantes del Congreso. Tu voz es importante."
              : "Share your opinion about our letter to Congress representatives. Your voice matters."}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Comment Form */}
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                ✍️
              </span>
              {t("lang") === "es" ? "Deja tu comentario" : "Leave your comment"}
            </h3>
            <CommentForm />
          </div>

          {/* Approved Comments */}
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                💬
              </span>
              {t("lang") === "es" ? "Comentarios aprobados" : "Approved comments"}
            </h3>
            <div className="max-h-[500px] overflow-y-auto pr-2">
              <ApprovedComments />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
