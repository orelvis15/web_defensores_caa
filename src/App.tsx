import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { VideoModalProvider } from "@/contexts/VideoModalContext";
import { VideoModal } from "@/components/VideoModal";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import TakeAction from "./pages/TakeAction";
import DonationSuccess from "./pages/DonationSuccess";
import About from "./pages/About";
import OurWork from "./pages/OurWork";
import Blog from "./pages/Blog";
import Resources from "./pages/Resources";
import GetInvolved from "./pages/GetInvolved";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Store from "./pages/Store";
import Sponsors from "./pages/Sponsors";
import Membership from "./pages/Membership";
import Ambassadors from "./pages/Ambassadors";
import Memory from "./pages/Memory";
import Premios2026 from "./pages/Premios2026";
import Events from "./pages/Events";
import EventsArchive from "./pages/EventsArchive";
import CommunityEvent from "./pages/CommunityEvent";
import EventDetail from "./pages/EventDetail";
import MyTickets from "./pages/MyTickets";
import { TransparencyList, TransparencyReport } from "./pages/Transparency";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CourseEnrollment from "./pages/CourseEnrollment";
import TemaMigratorio from "./pages/programs/TemaMigratorio";
import AyudaPersonas from "./pages/programs/AyudaPersonas";
import LibertadCuba from "./pages/programs/LibertadCuba";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// The old gallery links (/galeria/:id) now open the event album in the Memoria.
function GalleryRedirect() {
  const { id } = useParams();
  return <Navigate to={`/memoria/${id}`} replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <VideoModalProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <VideoModal />
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/take-action" element={<TakeAction />} />
            <Route path="/donation-success" element={<DonationSuccess />} />
            <Route path="/about" element={<About />} />
            <Route path="/our-work" element={<OurWork />} />
            <Route path="/programas/migratorio" element={<TemaMigratorio />} />
            <Route path="/programas/ayuda" element={<AyudaPersonas />} />
            <Route path="/programas/libertad-cuba" element={<LibertadCuba />} />
            <Route path="/programas" element={<Navigate to="/#programas" replace />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/store" element={<Store />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/membresia" element={<Membership />} />
            <Route path="/membership" element={<Navigate to="/membresia" replace />} />
            <Route path="/embajadores" element={<Ambassadors />} />
            <Route path="/memoria" element={<Memory />} />
            <Route path="/memoria/:eventId" element={<Memory />} />
            <Route path="/galeria" element={<Navigate to="/memoria" replace />} />
            <Route path="/galeria/:id" element={<GalleryRedirect />} />
            <Route path="/premios-2026" element={<Premios2026 />} />
            <Route path="/eventos" element={<Events />} />
            <Route path="/eventos/archivo" element={<EventsArchive />} />
            <Route path="/evento/:slug" element={<CommunityEvent />} />
            <Route path="/eventos/:slug" element={<EventDetail />} />
            <Route path="/galas" element={<Navigate to="/eventos" replace />} />
            <Route path="/entradas/:code" element={<MyTickets />} />
            <Route path="/transparencia" element={<TransparencyList />} />
            <Route path="/transparencia/:slug" element={<TransparencyReport />} />
            <Route path="/nominados" element={<Navigate to="/premios-2026" replace />} />
            <Route path="/patrocinadores" element={<Navigate to="/sponsors" replace />} />
            <Route path="/cursos" element={<Courses />} />
            <Route path="/cursos/inscripcion/:code" element={<CourseEnrollment />} />
            <Route path="/cursos/:slug" element={<CourseDetail />} />
            <Route path="/curso" element={<Navigate to="/cursos" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </VideoModalProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
