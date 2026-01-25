import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Send, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function CommentForm() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !comment.trim()) {
      toast({
        title: t("lang") === "es" ? "Campos requeridos" : "Required fields",
        description: t("lang") === "es" 
          ? "Por favor ingresa tu nombre y comentario" 
          : "Please enter your name and comment",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("submit-letter-comment", {
        body: { name, city, state, comment },
      });

      if (error) throw error;

      setIsSubmitted(true);
      setName("");
      setCity("");
      setState("");
      setComment("");
    } catch (err) {
      console.error("Error submitting comment:", err);
      toast({
        title: "Error",
        description: t("lang") === "es" 
          ? "No se pudo enviar el comentario. Intenta de nuevo." 
          : "Could not submit comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
        <h4 className="font-semibold text-foreground mb-2">
          {t("lang") === "es" ? "¡Gracias por tu comentario!" : "Thank you for your comment!"}
        </h4>
        <p className="text-sm text-muted-foreground mb-4">
          {t("lang") === "es" 
            ? "Tu comentario ha sido enviado y será revisado antes de publicarse." 
            : "Your comment has been submitted and will be reviewed before publishing."}
        </p>
        <Button variant="outline" size="sm" onClick={() => setIsSubmitted(false)}>
          {t("lang") === "es" ? "Enviar otro comentario" : "Submit another comment"}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="comment-name" className="text-sm">
            {t("lang") === "es" ? "Nombre *" : "Name *"}
          </Label>
          <Input
            id="comment-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("lang") === "es" ? "Tu nombre" : "Your name"}
            maxLength={100}
            required
          />
        </div>
        <div>
          <Label htmlFor="comment-city" className="text-sm">
            {t("lang") === "es" ? "Ciudad" : "City"}
          </Label>
          <Input
            id="comment-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={t("lang") === "es" ? "Tu ciudad" : "Your city"}
            maxLength={50}
          />
        </div>
        <div>
          <Label htmlFor="comment-state" className="text-sm">
            {t("lang") === "es" ? "Estado" : "State"}
          </Label>
          <Input
            id="comment-state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder={t("lang") === "es" ? "Ej: FL, TX" : "E.g: FL, TX"}
            maxLength={20}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="comment-text" className="text-sm">
          {t("lang") === "es" ? "Tu comentario *" : "Your comment *"}
        </Label>
        <Textarea
          id="comment-text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t("lang") === "es" 
            ? "Comparte tu opinión sobre la carta..." 
            : "Share your opinion about the letter..."}
          rows={4}
          maxLength={1000}
          required
        />
        <p className="text-xs text-muted-foreground mt-1 text-right">
          {comment.length}/1000
        </p>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          t("lang") === "es" ? "Enviando..." : "Submitting..."
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            {t("lang") === "es" ? "Enviar comentario" : "Submit comment"}
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground">
        {t("lang") === "es" 
          ? "* Los comentarios serán revisados antes de publicarse." 
          : "* Comments will be reviewed before publishing."}
      </p>
    </form>
  );
}
