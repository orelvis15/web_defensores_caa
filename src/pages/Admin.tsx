import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Shield,
  Check,
  X,
  LogOut,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Users,
  CreditCard,
  DollarSign,
  Eye,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";
import { CommentsManagement } from "@/components/admin/CommentsManagement";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ApplicationStatus = "pending" | "approved" | "denied";

interface Application {
  id: string;
  name: string;
  email: string;
  city: string;
  state: string;
  reason: string;
  note: string | null;
  status: ApplicationStatus;
  created_at: string;
}

interface Donation {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  amount: number;
  currency: string;
  donation_type: string;
  status: string;
  created_at: string;
  completed_at: string | null;
}

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading, isAdmin, signOut } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [loadingDonations, setLoadingDonations] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<ApplicationStatus | "all">("pending");
  const [activeTab, setActiveTab] = useState("applications");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
    if (!loading && user && !isAdmin) {
      navigate("/dashboard");
    }
  }, [user, loading, isAdmin, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchApplications();
      fetchDonations();
    }
  }, [user, isAdmin, filter]);

  const fetchApplications = async () => {
    setLoadingApps(true);
    let query = supabase
      .from("member_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("status", filter);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching applications:", error);
      toast({
        title: "Error",
        description: "Failed to load applications",
        variant: "destructive",
      });
    } else {
      setApplications(data as Application[]);
    }
    setLoadingApps(false);
  };

  const fetchDonations = async () => {
    setLoadingDonations(true);
    const { data, error } = await supabase
      .from("donations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching donations:", error);
      toast({
        title: "Error",
        description: "Failed to load donations",
        variant: "destructive",
      });
    } else {
      setDonations(data as Donation[]);
    }
    setLoadingDonations(false);
  };

  const handleApprove = async (application: Application) => {
    setProcessingId(application.id);
    
    try {
      // Call edge function to create user and update status
      const { data, error } = await supabase.functions.invoke("approve-member", {
        body: {
          applicationId: application.id,
          email: application.email,
          name: application.name,
          city: application.city,
          state: application.state,
        },
      });

      if (error) throw error;

      toast({
        title: "Application Approved",
        description: `${application.name} is now a member. They will receive a password reset email.`,
      });

      fetchApplications();
    } catch (error: any) {
      console.error("Error approving application:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to approve application",
        variant: "destructive",
      });
    }
    
    setProcessingId(null);
  };

  const handleDeny = async (application: Application) => {
    setProcessingId(application.id);
    
    try {
      const { error } = await supabase
        .from("member_applications")
        .update({
          status: "denied",
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", application.id);

      if (error) throw error;

      toast({
        title: "Application Denied",
        description: `${application.name}'s application has been denied.`,
      });

      fetchApplications();
    } catch (error: any) {
      console.error("Error denying application:", error);
      toast({
        title: "Error",
        description: "Failed to deny application",
        variant: "destructive",
      });
    }
    
    setProcessingId(null);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="outline" className="bg-success/10 text-success border-success/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case "denied":
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
            <XCircle className="w-3 h-3 mr-1" />
            Denied
          </Badge>
        );
    }
  };

  const getDonationStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="bg-success/10 text-success border-success/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      case "failed":
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
            <XCircle className="w-3 h-3 mr-1" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalDonations = donations
    .filter((d) => d.status === "completed" || d.status === "pending")
    .reduce((sum, d) => sum + Number(d.amount), 0);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <Layout>
      <section className="section-padding bg-gradient-to-b from-primary/5 to-background">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="heading-2 text-foreground">Admin Panel</h1>
                <p className="text-muted-foreground">Manage applications & donations</p>
              </div>
            </div>
            <Button variant="ghost" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-lg grid-cols-3">
              <TabsTrigger value="applications" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Applications
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Payments
              </TabsTrigger>
              <TabsTrigger value="comments" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Comments
              </TabsTrigger>
            </TabsList>

            <TabsContent value="applications" className="space-y-6">
              {/* Filter buttons */}
              <div className="flex flex-wrap gap-2">
                {(["all", "pending", "approved", "denied"] as const).map((status) => (
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

              {/* Applications table */}
              <div className="bg-card border rounded-xl overflow-hidden">
                {loadingApps ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : applications.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No applications found
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applications.map((app) => (
                          <TableRow key={app.id}>
                            <TableCell className="font-medium">{app.name}</TableCell>
                            <TableCell>{app.email}</TableCell>
                            <TableCell>
                              {app.city}, {app.state}
                            </TableCell>
                            <TableCell className="max-w-xs">
                              <div className="group relative flex items-center gap-2">
                                <span className="truncate">{app.reason}</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                  onClick={() => setSelectedApplication(app)}
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  View Details
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(app.status)}</TableCell>
                            <TableCell>
                              {new Date(app.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              {app.status === "pending" && (
                                <div className="flex gap-2 justify-end">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-success hover:bg-success/10"
                                    onClick={() => handleApprove(app)}
                                    disabled={processingId === app.id}
                                  >
                                    {processingId === app.id ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <Check className="w-4 h-4" />
                                    )}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-destructive hover:bg-destructive/10"
                                    onClick={() => handleDeny(app)}
                                    disabled={processingId === app.id}
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
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              {/* Summary Card */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-card border rounded-xl p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Donations</p>
                      <p className="text-2xl font-bold text-foreground">${totalDonations.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card border rounded-xl p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Donations</p>
                      <p className="text-2xl font-bold text-foreground">{donations.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card border rounded-xl p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Donors</p>
                      <p className="text-2xl font-bold text-foreground">
                        {donations.filter((d) => d.donation_type === "monthly").length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Donations table */}
              <div className="bg-card border rounded-xl overflow-hidden">
                {loadingDonations ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : donations.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No donations yet
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Donor</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {donations.map((donation) => (
                          <TableRow key={donation.id}>
                            <TableCell className="font-medium">
                              {[donation.first_name, donation.last_name].filter(Boolean).join(" ") || "Anonymous"}
                            </TableCell>
                            <TableCell>{donation.email}</TableCell>
                            <TableCell className="font-semibold text-success">
                              ${Number(donation.amount).toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={donation.donation_type === "monthly" ? "bg-primary/10 text-primary border-primary/30" : ""}>
                                {donation.donation_type === "monthly" ? "Monthly" : "One-time"}
                              </Badge>
                            </TableCell>
                            <TableCell>{getDonationStatusBadge(donation.status)}</TableCell>
                            <TableCell>
                              {new Date(donation.created_at).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="comments">
              <CommentsManagement />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Application Details Dialog */}
      <Dialog open={!!selectedApplication} onOpenChange={(open) => !open && setSelectedApplication(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Application Details
              {selectedApplication && getStatusBadge(selectedApplication.status)}
            </DialogTitle>
          </DialogHeader>
          
          {selectedApplication && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedApplication.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedApplication.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">City</p>
                  <p className="font-medium">{selectedApplication.city}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">State</p>
                  <p className="font-medium">{selectedApplication.state}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date Applied</p>
                  <p className="font-medium">{new Date(selectedApplication.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Reason for Joining</p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="whitespace-pre-wrap">{selectedApplication.reason}</p>
                </div>
              </div>

              {selectedApplication.note && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Additional Notes</p>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="whitespace-pre-wrap">{selectedApplication.note}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setSelectedApplication(null)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Panel
                </Button>
                
                {selectedApplication.status === "pending" && (
                  <>
                    <Button
                      className="bg-success hover:bg-success/90 text-success-foreground"
                      onClick={() => {
                        handleApprove(selectedApplication);
                        setSelectedApplication(null);
                      }}
                      disabled={processingId === selectedApplication.id}
                    >
                      {processingId === selectedApplication.id ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4 mr-2" />
                      )}
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleDeny(selectedApplication);
                        setSelectedApplication(null);
                      }}
                      disabled={processingId === selectedApplication.id}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Deny
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
