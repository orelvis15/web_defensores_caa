import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Check,
  X,
  Eye,
  Mail as MailIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
  reviewed_at: string | null;
}

export function ContactManagement() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [filter, setFilter] = useState<string>("pending");

  useEffect(() => {
    fetchSubmissions();
  }, [filter]);

  const fetchSubmissions = async () => {
    setLoading(true);
    let query = supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("status", filter);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching contact submissions:", error);
      toast({
        title: "Error",
        description: "Failed to load contact submissions",
        variant: "destructive",
      });
    } else {
      setSubmissions(data as ContactSubmission[]);
    }
    setLoading(false);
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    setProcessingId(id);

    try {
      const { error } = await supabase
        .from("contact_submissions")
        .update({
          status,
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: status === "reviewed" ? "Marked as Reviewed" : "Status Updated",
        description: `Contact submission has been marked as ${status}.`,
      });

      fetchSubmissions();
      setSelectedSubmission(null);
    } catch (error: any) {
      console.error("Error updating submission:", error);
      toast({
        title: "Error",
        description: "Failed to update submission",
        variant: "destructive",
      });
    }

    setProcessingId(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "reviewed":
        return (
          <Badge variant="outline" className="bg-success/10 text-success border-success/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Reviewed
          </Badge>
        );
      case "spam":
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
            <XCircle className="w-3 h-3 mr-1" />
            Spam
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSubjectLabel = (subject: string) => {
    const labels: Record<string, string> = {
      general: "General Inquiry",
      media: "Media/Press",
      observatory: "Observatory Report",
      volunteer: "Volunteer",
      other: "Other",
    };
    return labels[subject] || subject;
  };

  return (
    <div className="space-y-6">
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2">
        {["all", "pending", "reviewed", "spam"].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      {/* Submissions table */}
      <div className="bg-card border rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No contact submissions found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">{submission.name}</TableCell>
                    <TableCell>{submission.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{getSubjectLabel(submission.subject)}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="group relative flex items-center gap-2">
                        <span className="truncate">{submission.message}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                          onClick={() => setSelectedSubmission(submission)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(submission.status)}</TableCell>
                    <TableCell>
                      {new Date(submission.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {submission.status === "pending" && (
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-success hover:bg-success/10"
                            onClick={() => handleUpdateStatus(submission.id, "reviewed")}
                            disabled={processingId === submission.id}
                          >
                            {processingId === submission.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => handleUpdateStatus(submission.id, "spam")}
                            disabled={processingId === submission.id}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Submission Details Dialog */}
      <Dialog open={!!selectedSubmission} onOpenChange={(open) => !open && setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Contact Submission
              {selectedSubmission && getStatusBadge(selectedSubmission.status)}
            </DialogTitle>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedSubmission.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${selectedSubmission.email}`}
                    className="font-medium text-primary hover:underline flex items-center gap-1"
                  >
                    <MailIcon className="w-4 h-4" />
                    {selectedSubmission.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Subject</p>
                  <Badge variant="secondary">{getSubjectLabel(selectedSubmission.subject)}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {new Date(selectedSubmission.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Message</p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
                  Close
                </Button>

                <Button
                  variant="outline"
                  onClick={() => window.open(`mailto:${selectedSubmission.email}`, "_blank")}
                >
                  <MailIcon className="w-4 h-4 mr-2" />
                  Reply via Email
                </Button>

                {selectedSubmission.status === "pending" && (
                  <>
                    <Button
                      className="bg-success hover:bg-success/90 text-success-foreground"
                      onClick={() => handleUpdateStatus(selectedSubmission.id, "reviewed")}
                      disabled={processingId === selectedSubmission.id}
                    >
                      {processingId === selectedSubmission.id ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4 mr-2" />
                      )}
                      Mark as Reviewed
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleUpdateStatus(selectedSubmission.id, "spam")}
                      disabled={processingId === selectedSubmission.id}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Mark as Spam
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
