import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { albumPath, getFeaturedMemory, monthYear } from "@/config/memory";
import { MemoryLightbox } from "@/components/memory/MemoryLightbox";
import { MemoryTile } from "@/components/memory/MemoryTile";

/**
 * "Nuestra Memoria" on the home page: 6–12 recent photos and videos of the
 * events (featured first), fed automatically by the Memoria of the system.
 * Phones get a swipeable row; tablets and computers a grid. Hidden while
 * nothing has been published.
 */
export function NuestraMemoria() {
  const { language } = useLanguage();
  const es = language === "ES";
  const [open, setOpen] = useState<number | null>(null);
  const { data } = useQuery({ queryKey: ["memory-featured"], queryFn: () => getFeaturedMemory(12), staleTime: 5 * 60_000 });
  const items = data?.items || [];
  if (items.length === 0) return null;

  return (
    <section className="py-12 md:py-16" aria-labelledby="nuestra-memoria">
      <div className="container-wide">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Images className="h-4 w-4" />{es ? "Fotos y videos" : "Photos and videos"}
            </span>
            <h2 id="nuestra-memoria" className="heading-2 text-foreground">{es ? "Nuestra Memoria" : "Our Memories"}</h2>
            <p className="mt-1 max-w-2xl text-muted-foreground">
              {es ? "Imágenes reales de nuestras clínicas, galas y actividades en la comunidad." : "Real images from our clinics, galas and community activities."}
            </p>
          </div>
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link to="/memoria">{es ? "Ver toda la Memoria" : "See all memories"}<ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>

        <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {items.map((it, i) => (
            <li key={it.id} className="w-[72%] shrink-0 snap-start sm:w-auto">
              <MemoryTile item={it} es={es} onOpen={() => setOpen(i)} className="aspect-[4/3]" />
              {it.event && (
                <Link to={albumPath(it.event.id)} className="mt-1.5 block text-sm leading-snug text-muted-foreground hover:text-primary">
                  <span className="line-clamp-2"><span className="font-medium text-foreground">{it.event.name}</span> – {monthYear(it.event.date, es)}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-6 text-center sm:hidden">
          <Button asChild variant="outline">
            <Link to="/memoria">{es ? "Ver toda la Memoria" : "See all memories"}<ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
      {open != null && <MemoryLightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} es={es} showEvent />}
    </section>
  );
}
