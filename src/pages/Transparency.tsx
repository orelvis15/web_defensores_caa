import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Download, FileText, Landmark, Loader2, ShieldCheck } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatFigure, getReport, listReports, reportAsset, type PublicReport, type ReportChart } from "@/config/reports";

const COLORS = ["hsl(var(--primary))", "#1e8e3e", "#f9ab00", "#d93025", "#a142f4", "#24c1e0", "#ff7043", "#5c6bc0"];

const fmtDate = (v: string | undefined, es: boolean) =>
  v ? new Date(v).toLocaleDateString(es ? "es-US" : "en-US", { day: "numeric", month: "long", year: "numeric" }) : "";

function rows(c: ReportChart) {
  const labels = c.series[0]?.points.map((p) => p.label) || [];
  return labels.map((label, i) => Object.fromEntries([["label", label], ...c.series.map((s) => [s.name, s.points[i]?.value ?? 0])]));
}

function Chart({ chart, es }: { chart: ReportChart; es: boolean }) {
  const money = chart.format === "money";
  const fmt = (v: number) => (money ? (v / 100).toLocaleString(es ? "es-US" : "en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }) : v.toLocaleString());
  return (
    <figure className="rounded-xl border bg-card p-4">
      <figcaption className="mb-3 text-sm font-semibold">{chart.title}</figcaption>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {chart.kind === "pie" ? (
            <PieChart>
              <Pie data={chart.series[0]?.points || []} dataKey="value" nameKey="label" innerRadius="45%" outerRadius="80%">
                {(chart.series[0]?.points || []).map((p, i) => <Cell key={p.label} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v: number) => fmt(v)} />
              <Legend />
            </PieChart>
          ) : chart.kind === "line" ? (
            <LineChart data={rows(chart)}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" fontSize={12} />
              <YAxis fontSize={12} tickFormatter={fmt} width={60} />
              <Tooltip formatter={(v: number) => fmt(v)} />
              {chart.series.length > 1 && <Legend />}
              {chart.series.map((s, i) => <Line key={s.name} type="monotone" dataKey={s.name} stroke={COLORS[i % COLORS.length]} strokeWidth={2} />)}
            </LineChart>
          ) : (
            <BarChart data={rows(chart)}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" fontSize={12} />
              <YAxis fontSize={12} tickFormatter={fmt} width={60} />
              <Tooltip formatter={(v: number) => fmt(v)} />
              {chart.series.length > 1 && <Legend />}
              {chart.series.map((s, i) => <Bar key={s.name} dataKey={s.name} fill={COLORS[i % COLORS.length]} radius={[4, 4, 0, 0]} />)}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </figure>
  );
}

function Downloads({ r, es }: { r: PublicReport; es: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {r.pdf_url && (
        <a href={reportAsset(r.pdf_url)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
          <Download className="h-4 w-4" />PDF
        </a>
      )}
      {r.docx_url && (
        <a href={reportAsset(r.docx_url)} className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted">
          <Download className="h-4 w-4" />Word
        </a>
      )}
      {!r.pdf_url && !r.docx_url && <span className="text-sm text-muted-foreground">{es ? "Sin archivos" : "No files"}</span>}
    </div>
  );
}

function Hero({ es }: { es: boolean }) {
  return (
    <section className="bg-gradient-to-b from-primary/10 to-background py-16">
      <div className="container-wide max-w-5xl text-center">
        <p className="mb-3 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <ShieldCheck className="h-4 w-4" />{es ? "Transparencia" : "Transparency"}
          </span>
        </p>
        <h1 className="text-4xl font-bold text-foreground md:text-5xl">{es ? "Informes y Transparencia" : "Reports and Transparency"}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {es
            ? "Los informes de resultados aprobados por la Junta Directiva, publicados según el artículo 8.4 de nuestros Estatutos. Solo contienen cifras agregadas: nunca datos que identifiquen a las personas que atendemos."
            : "Results reports approved by the Board of Directors, published under article 8.4 of our Bylaws. They contain aggregated figures only — never data that identifies the people we serve."}
        </p>
      </div>
    </section>
  );
}

/** /transparencia — list of the published reports, newest first. */
export function TransparencyList() {
  const { language } = useLanguage();
  const es = language === "ES";
  const { data, isLoading, isError } = useQuery({ queryKey: ["public-reports"], queryFn: listReports });
  const items = data?.items || [];
  const byYear = items.reduce<Record<number, PublicReport[]>>((acc, r) => {
    (acc[r.period.year] ||= []).push(r);
    return acc;
  }, {});
  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a);
  return (
    <Layout>
      <Hero es={es} />
      <section className="py-12">
        <div className="container-wide max-w-5xl">
          {isLoading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : isError ? (
            <p className="py-16 text-center text-muted-foreground">{es ? "No pudimos cargar los informes. Inténtalo más tarde." : "We could not load the reports. Please try later."}</p>
          ) : items.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">{es ? "Todavía no hay informes publicados." : "There are no published reports yet."}</p>
          ) : (
            <div className="space-y-10">
              {years.map((y) => (
                <div key={y}>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">{y}</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {byYear[y].map((r) => (
                      <article key={r.slug} className="flex flex-col justify-between gap-4 rounded-2xl border bg-card p-5 shadow-sm">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-primary">{r.kind_label} · {r.scope_label}</p>
                          <h3 className="mt-1 text-lg font-bold"><Link to={`/transparencia/${r.slug}`} className="hover:text-primary">{r.title}</Link></h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {r.period.label}{r.version > 1 ? (es ? ` · versión ${r.version}` : ` · version ${r.version}`) : ""} · {es ? "publicado el" : "published"} {fmtDate(r.published_at, es)}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <Link to={`/transparencia/${r.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                            <FileText className="h-4 w-4" />{es ? "Ver informe" : "View report"}
                          </Link>
                          <Downloads r={r} es={es} />
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

/** /transparencia/:slug — one published report. */
export function TransparencyReport() {
  const { slug = "" } = useParams();
  const { language } = useLanguage();
  const es = language === "ES";
  const { data: r, isLoading, isError } = useQuery({ queryKey: ["public-report", slug], queryFn: () => getReport(slug) });
  return (
    <Layout>
      <section className="py-12">
        <div className="container-wide max-w-5xl">
          <Link to="/transparencia" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />{es ? "Informes y Transparencia" : "Reports and Transparency"}
          </Link>
          {isLoading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : isError || !r ? (
            <p className="py-16 text-center text-muted-foreground">{es ? "No encontramos este informe." : "We could not find this report."}</p>
          ) : (
            <article className="space-y-10">
              <header className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">{r.kind_label} · {r.period.label} · {r.scope_label}</p>
                <h1 className="text-3xl font-bold text-foreground md:text-4xl">{r.title}</h1>
                {r.approved_by && (
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Landmark className="h-4 w-4" />{es ? "Aprobado por la" : "Approved by the"} {r.approved_by}{r.approved_at ? ` · ${fmtDate(r.approved_at, es)}` : ""}
                  </p>
                )}
                <Downloads r={r} es={es} />
              </header>
              {(r.sections || []).map((s) => (
                <section key={s.key} className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">{s.title}</h2>
                  {s.narrative && <p className="whitespace-pre-line leading-relaxed text-muted-foreground">{s.narrative}</p>}
                  {s.figures.length > 0 && (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {s.figures.map((f) => (
                        <div key={f.key} className="rounded-xl border bg-card p-4">
                          <p className="text-2xl font-bold text-primary">{formatFigure(f, es)}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{f.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {s.charts.length > 0 && <div className="grid gap-4 md:grid-cols-2">{s.charts.map((c) => <Chart key={c.key} chart={c} es={es} />)}</div>}
                  {s.tables.map((t) => (
                    <div key={t.title} className="overflow-x-auto rounded-xl border">
                      <p className="border-b bg-muted/50 px-4 py-2 text-sm font-semibold">{t.title}</p>
                      <table className="w-full text-sm">
                        <thead className="text-left text-muted-foreground"><tr>{t.columns.map((c) => <th key={c} className="px-4 py-2 font-medium">{c}</th>)}</tr></thead>
                        <tbody className="divide-y">{t.rows.map((row, i) => <tr key={i}>{row.map((v, j) => <td key={j} className="px-4 py-2">{v}</td>)}</tr>)}</tbody>
                      </table>
                    </div>
                  ))}
                </section>
              ))}
              {(r.photos || []).length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">{es ? "Memoria fotográfica" : "Photo memory"}</h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {r.photos!.map((p) => (
                      <figure key={p.url} className="overflow-hidden rounded-xl border bg-card">
                        <img src={reportAsset(p.url)} alt={p.caption} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                        <figcaption className="p-3 text-sm text-muted-foreground">{p.caption}{p.author ? ` · ${es ? "foto" : "photo"}: ${p.author}` : ""}</figcaption>
                      </figure>
                    ))}
                  </div>
                </section>
              )}
              {r.financials && (
                <section className="space-y-3">
                  <h2 className="text-2xl font-bold text-foreground">{es ? "Estados financieros" : "Financial statements"}</h2>
                  <p className="whitespace-pre-line text-muted-foreground">{r.financials}</p>
                </section>
              )}
            </article>
          )}
        </div>
      </section>
    </Layout>
  );
}
