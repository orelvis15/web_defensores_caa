import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, CalendarDays, Clock, MapPin, Video, Loader2, Users } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { listCourses, money, fmtPeriod, fmtHours, type PublicCourse } from "@/config/courses";

/** Cursos, talleres, conferencias y ciclos publicados desde el admin. */
export default function Courses() {
  const { language } = useLanguage();
  const es = language === "ES";
  const { data, isLoading, isError } = useQuery({ queryKey: ["public-courses"], queryFn: () => listCourses() });
  const items = data?.items || [];

  return (
    <Layout>
      <section className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="container-wide max-w-5xl text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <GraduationCap className="h-4 w-4" /> {es ? "Cursos y Conferencias" : "Courses & Conferences"}
          </p>
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">{es ? "Aprende con nosotros" : "Learn with us"}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {es
              ? "Cursos, talleres, conferencias y ciclos para la comunidad. Inscríbete en línea; los miembros activos con su membresía al día reciben un descuento automático."
              : "Courses, workshops, conferences and series for the community. Enroll online; active members with a current membership get an automatic discount."}
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="container-wide max-w-6xl">
          {isLoading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : isError ? (
            <p className="py-16 text-center text-muted-foreground">{es ? "No pudimos cargar los cursos. Inténtalo más tarde." : "We could not load the courses. Please try again later."}</p>
          ) : items.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">{es ? "Pronto anunciaremos nuevos cursos." : "New courses coming soon."}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((c) => <CourseCard key={c.slug} c={c} es={es} />)}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

function CourseCard({ c, es }: { c: PublicCourse; es: boolean }) {
  return (
    <Link to={`/cursos/${c.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-md">
      {c.image_url ? (
        <img src={c.image_url} alt="" className="aspect-video w-full object-cover" loading="lazy" />
      ) : (
        <div className="flex aspect-video items-center justify-center bg-primary/10"><GraduationCap className="h-12 w-12 text-primary/60" /></div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{c.kind_label} · {c.modality_label}</p>
        <h2 className="text-lg font-bold text-foreground group-hover:text-primary">{c.title}</h2>
        {c.summary && <p className="line-clamp-3 text-sm text-muted-foreground">{c.summary}</p>}
        <div className="mt-auto space-y-1 pt-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4" />{fmtPeriod(c, es)}</p>
          {c.schedule && <p className="flex items-center gap-2"><Clock className="h-4 w-4" />{c.schedule} · {fmtHours(c.total_hours)}</p>}
          <p className="flex items-center gap-2">{c.modality === "virtual" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}{c.modality === "virtual" ? (es ? "En línea" : "Online") : c.location}</p>
          {c.capacity > 0 && c.remaining >= 0 && <p className="flex items-center gap-2"><Users className="h-4 w-4" />{c.full ? (es ? "Cupo completo" : "Full") : `${c.remaining} ${es ? "lugares" : "seats left"}`}</p>}
        </div>
        <div className="flex items-center justify-between pt-3">
          <span className="text-lg font-bold">{c.free ? (es ? "Gratis" : "Free") : money(c.price_cents)}</span>
          <span className="text-sm font-medium text-primary">
            {c.enroll_open ? (c.waitlist ? (es ? "Lista de espera" : "Waitlist") : es ? "Inscribirme" : "Enroll") : es ? "Inscripción cerrada" : "Enrollment closed"}
          </span>
        </div>
      </div>
    </Link>
  );
}
