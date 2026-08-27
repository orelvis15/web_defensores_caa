import { useCallback, useEffect, useRef, useState } from "react";
import { Users, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface CampaignRaisedCounterProps {
  /** Mismo identificador con el que se etiquetan las donaciones de la campaña. */
  campaignId: string;
  /** Meta en USD. Si se omite, se muestra solo el total, sin barra de progreso. */
  goal?: number;
  className?: string;
}

interface CampaignTotals {
  total: number;
  count: number;
}

const COUNT_UP_DURATION_MS = 1200;

/**
 * Total recaudado por una campaña, leído de la función get-campaign-total
 * (suma de las donaciones en estado "completed").
 */
export function CampaignRaisedCounter({
  campaignId,
  goal,
  className,
}: CampaignRaisedCounterProps) {
  const { language } = useLanguage();
  const isSpanish = language === "ES";

  const [totals, setTotals] = useState<CampaignTotals | null>(null);
  const [hasFailed, setHasFailed] = useState(false);

  const fetchTotals = useCallback(async () => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const res = await fetch(
        `${supabaseUrl}/functions/v1/get-campaign-total?campaignId=${encodeURIComponent(campaignId)}`,
        { headers: { apikey: supabaseKey } }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setTotals({ total: Number(data?.total) || 0, count: Number(data?.count) || 0 });
      setHasFailed(false);
    } catch (err) {
      console.error("Error fetching campaign total:", err);
      setHasFailed(true);
    }
  }, [campaignId]);

  useEffect(() => {
    fetchTotals();
  }, [fetchTotals]);

  // Al volver a la pestaña puede haber donaciones nuevas —por ejemplo la que
  // acaba de hacer quien vuelve de Stripe—, así que refrescamos el total.
  useEffect(() => {
    const handleFocus = () => {
      if (document.visibilityState === "visible") fetchTotals();
    };
    document.addEventListener("visibilitychange", handleFocus);
    return () => document.removeEventListener("visibilitychange", handleFocus);
  }, [fetchTotals]);

  const displayedTotal = useCountUp(totals?.total ?? 0, totals !== null);
  const isLoading = totals === null && !hasFailed;

  // Un fallo de red no debe dejar un contador en cero, que se leería como
  // "nadie ha donado": en ese caso el bloque simplemente no se muestra.
  if (hasFailed) return null;

  const progress =
    goal && goal > 0 && totals
      ? Math.min(100, Math.round((totals.total / goal) * 100))
      : null;

  return (
    <div
      className={cn(
        "rounded-2xl border border-primary/20 bg-gradient-to-br from-primary to-primary/85 p-5 md:p-6 text-primary-foreground shadow-lg",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="w-4 h-4 opacity-90" />
        <p className="text-xs md:text-sm font-medium uppercase tracking-wide opacity-90">
          {isSpanish ? "Recaudado hasta ahora" : "Raised so far"}
        </p>
      </div>

      {isLoading ? (
        <div
          className="h-11 md:h-12 w-44 rounded-lg bg-primary-foreground/20 animate-pulse"
          aria-hidden="true"
        />
      ) : (
        <p
          className="text-4xl md:text-5xl font-bold tracking-tight tabular-nums"
          aria-live="polite"
        >
          {formatCurrency(displayedTotal, language)}
        </p>
      )}

      {progress !== null && (
        <div className="mt-4">
          <div
            className="h-2 w-full rounded-full bg-primary-foreground/20 overflow-hidden"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-primary-foreground transition-[width] duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs opacity-90">
            {isSpanish
              ? `${progress}% de la meta de ${formatCurrency(goal!, language)}`
              : `${progress}% of the ${formatCurrency(goal!, language)} goal`}
          </p>
        </div>
      )}

      {!isLoading && (
        <div className="mt-3 flex items-center gap-1.5 text-sm opacity-90">
          <Users className="w-4 h-4" />
          <span>
            {totals!.count === 0
              ? isSpanish
                ? "Sé la primera persona en donar"
                : "Be the first to donate"
              : isSpanish
              ? `${totals!.count} ${totals!.count === 1 ? "donación" : "donaciones"}`
              : `${totals!.count} ${totals!.count === 1 ? "donation" : "donations"}`}
          </span>
        </div>
      )}
    </div>
  );
}

function formatCurrency(amount: number, language: string) {
  return new Intl.NumberFormat(language === "ES" ? "es-US" : "en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Anima el conteo desde 0 hasta `target`, salvo que se pida menos movimiento. */
function useCountUp(target: number, isEnabled: boolean) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!isEnabled) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || target === 0) {
      setValue(target);
      return;
    }

    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / COUNT_UP_DURATION_MS);
      // easeOutCubic: arranca rápido y frena al llegar a la cifra final.
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, isEnabled]);

  return value;
}
