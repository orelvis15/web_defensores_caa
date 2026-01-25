import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";

interface Comment {
  id: string;
  name: string;
  city: string | null;
  state: string | null;
  comment: string;
  created_at: string;
}

export function ApprovedComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from("letter_comments")
        .select("id, name, city, state, comment, created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setComments(data || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, "d MMM, yyyy", { 
      locale: t("lang") === "es" ? es : enUS 
    });
  };

  const getLocation = (city: string | null, state: string | null) => {
    if (city && state) return `${city}, ${state}`;
    if (city) return city;
    if (state) return state;
    return null;
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-pulse text-muted-foreground">
          {t("lang") === "es" ? "Cargando comentarios..." : "Loading comments..."}
        </div>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 bg-muted/30 rounded-xl">
        <MessageCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
        <p className="text-muted-foreground">
          {t("lang") === "es" 
            ? "Aún no hay comentarios. ¡Sé el primero en opinar!" 
            : "No comments yet. Be the first to share your opinion!"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((item) => {
        const location = getLocation(item.city, item.state);
        return (
          <div 
            key={item.id} 
            className="bg-card border rounded-xl p-4 md:p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-semibold text-sm">
                  {item.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-semibold text-foreground">{item.name}</span>
                  {location && (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {location}
                    </span>
                  )}
                </div>
                <p className="text-foreground text-sm md:text-base leading-relaxed mb-2">
                  {item.comment}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(item.created_at)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
