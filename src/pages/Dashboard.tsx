import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Construction, Rocket, LogOut } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading, isMember, isAdmin, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
    if (!loading && user && isAdmin && !isMember) {
      navigate("/admin");
    }
  }, [user, loading, isMember, isAdmin, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center section-padding bg-gradient-to-b from-primary/5 to-background">
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <Construction className="w-12 h-12 text-primary" />
          </div>

          <h1 className="heading-1 text-foreground mb-4">Coming Soon</h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            We are a work in progress. Your member dashboard is being built with care and will be available soon.
          </p>

          <div className="inline-flex items-center gap-3 bg-card border rounded-xl px-6 py-4 mb-8">
            <Rocket className="w-6 h-6 text-cta" />
            <span className="text-muted-foreground">
              Welcome, <span className="font-semibold text-foreground">{user.email}</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAdmin && (
              <Button variant="outline" onClick={() => navigate("/admin")}>
                Go to Admin Panel
              </Button>
            )}
            <Button variant="ghost" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
