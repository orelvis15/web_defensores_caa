import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Clock, MapPin, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Comment {
  id: string;
  name: string;
  city: string | null;
  state: string | null;
  comment: string;
  status: string;
  created_at: string;
}

export function CommentsManagement() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("letter_comments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
      toast({
        title: "Error",
        description: "No se pudieron cargar los comentarios",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateCommentStatus = async (id: string, status: "approved" | "denied") => {
    setActionLoading(id);
    try {
      const { error } = await supabase
        .from("letter_comments")
        .update({ 
          status, 
          reviewed_at: new Date().toISOString() 
        })
        .eq("id", id);

      if (error) throw error;

      setComments(prev => 
        prev.map(c => c.id === id ? { ...c, status } : c)
      );

      toast({
        title: status === "approved" ? "Comentario aprobado" : "Comentario rechazado",
        description: status === "approved" 
          ? "El comentario ahora es visible públicamente" 
          : "El comentario ha sido rechazado",
      });
    } catch (err) {
      console.error("Error updating comment:", err);
      toast({
        title: "Error",
        description: "No se pudo actualizar el comentario",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Aprobado</Badge>;
      case "denied":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Rechazado</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Pendiente</Badge>;
    }
  };

  const getLocation = (city: string | null, state: string | null) => {
    if (city && state) return `${city}, ${state}`;
    if (city) return city;
    if (state) return state;
    return "-";
  };

  const pendingCount = comments.filter(c => c.status === "pending").length;

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-muted-foreground">Cargando comentarios...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Comentarios de la Carta</h2>
          <p className="text-sm text-muted-foreground">
            {pendingCount > 0 
              ? `${pendingCount} comentario${pendingCount > 1 ? 's' : ''} pendiente${pendingCount > 1 ? 's' : ''} de revisión`
              : "No hay comentarios pendientes"}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchComments}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualizar
        </Button>
      </div>

      {comments.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-xl">
          <Clock className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-muted-foreground">No hay comentarios todavía</p>
        </div>
      ) : (
        <div className="border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Nombre</TableHead>
                <TableHead className="w-[100px]">Ubicación</TableHead>
                <TableHead>Comentario</TableHead>
                <TableHead className="w-[100px]">Estado</TableHead>
                <TableHead className="w-[100px]">Fecha</TableHead>
                <TableHead className="w-[140px] text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments.map((item) => (
                <TableRow key={item.id} className={item.status === "pending" ? "bg-yellow-50/50 dark:bg-yellow-900/10" : ""}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {getLocation(item.city, item.state)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm line-clamp-2 max-w-md">{item.comment}</p>
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(item.created_at), "d MMM", { locale: es })}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.status === "pending" && (
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => updateCommentStatus(item.id, "approved")}
                          disabled={actionLoading === item.id}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => updateCommentStatus(item.id, "denied")}
                          disabled={actionLoading === item.id}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                    {item.status !== "pending" && (
                      <span className="text-xs text-muted-foreground">Revisado</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
