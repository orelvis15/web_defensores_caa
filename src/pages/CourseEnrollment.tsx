import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Clock, Hourglass, XCircle, Loader2, GraduationCap, ExternalLink } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { MembersApiError } from "@/config/members";
import { getEnrollment, payEnrollment, cancelEnrollment, money, fmtPeriod } from "@/config/courses";

/** Página de retorno de Stripe y estado de la inscripción (enlace con token del correo). */
export default function CourseEnrollment() {
  const { code = "" } = useParams();
  const [params] = useSearchParams();
  const token = params.get("t") || "";
  const { language } = useLanguage();
  const es = language === "ES";
  const qc = useQueryClient();
  const key = ["course-enrollment", code, token];
  const { data: e, isLoading, isError } = useQuery({
    queryKey: key,
    queryFn: () => getEnrollment(code, token),
    // Right after Stripe the payment may take a few seconds to settle.
    refetchInterval: (q) => (q.state.data?.status === "pending" && params.get("session_id") ? 3000 : false),
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(false);
  const [reason, setReason] = useState("");

  if (isLoading) return <Layout><div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></Layout>;
  if (isError || !e) {
    return (
      <Layout>
        <div className="container-wide max-w-xl py-24 text-center">
          <h1 className="text-2xl font-bold">{es ? "Inscripción no encontrada" : "Enrollment not found"}</h1>
          <p className="mt-2 text-muted-foreground">{es ? "Revisa el enlace del correo." : "Check the link in your e-mail."}</p>
        </div>
      </Layout>
    );
  }

  const pay = async () => {
    setBusy(true);
    setError("");
    try {
      const r = await payEnrollment(code, token);
      window.location.href = r.url;
    } catch (err) {
      setError(err instanceof MembersApiError ? err.message : "Error");
      setBusy(false);
    }
  };
  const cancel = async () => {
    setBusy(true);
    setError("");
    try {
      await cancelEnrollment(code, token, reason);
      await qc.invalidateQueries({ queryKey: key });
      setCancelling(false);
    } catch (err) {
      setError(err instanceof MembersApiError ? err.message : "Error");
    } finally {
      setBusy(false);
    }
  };

  const view = {
    confirmed: { icon: CheckCircle2, cls: "text-green-600", title: es ? "¡Inscripción confirmada!" : "Enrollment confirmed!", body: es ? "Te enviamos la confirmación y el recibo por correo. Entra a tu aula virtual para ver el programa, los materiales y, en el horario de cada clase, el enlace." : "We e-mailed your confirmation and receipt. Open your virtual classroom to see the program, materials and, at class time, the link." },
    pending: { icon: Clock, cls: "text-amber-600", title: es ? "Pago pendiente" : "Payment pending", body: es ? "Estamos esperando la confirmación del pago. Si ya pagaste, esta página se actualizará en unos segundos." : "We are waiting for the payment confirmation. If you already paid, this page will update in a few seconds." },
    offered: { icon: Hourglass, cls: "text-primary", title: es ? "¡Tienes un cupo!" : "A seat is yours!", body: es ? "Completa el pago para confirmar tu lugar antes de que venza la reserva." : "Complete the payment to confirm your seat before the hold expires." },
    waitlist: { icon: Hourglass, cls: "text-primary", title: es ? "Estás en la lista de espera" : "You are on the waitlist", body: es ? `Posición ${e.waitlist_position}. Te avisaremos por correo si se libera un lugar.` : `Position ${e.waitlist_position}. We will e-mail you if a seat opens.` },
  }[e.status] || { icon: XCircle, cls: "text-muted-foreground", title: es ? "Inscripción no activa" : "Enrollment not active", body: es ? "Esta inscripción fue cancelada, reembolsada o venció." : "This enrollment was cancelled, refunded or expired." };

  return (
    <Layout>
      <section className="py-16">
        <div className="container-wide max-w-2xl">
          <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
            <view.icon className={`mx-auto h-14 w-14 ${view.cls}`} />
            <h1 className="mt-4 text-2xl font-bold">{view.title}</h1>
            <p className="mt-2 text-muted-foreground">{view.body}</p>
            <div className="mt-6 rounded-xl bg-muted p-4 text-left text-sm">
              <p className="font-semibold">{e.course.title}</p>
              <p className="text-muted-foreground">{fmtPeriod(e.course, es)}{e.course.schedule ? ` · ${e.course.schedule}` : ""}</p>
              <p className="mt-1 text-muted-foreground">{e.name} · {e.email} · {e.code}</p>
              <dl className="mt-3 space-y-1">
                {e.pricing.lines.map((l, i) => <div key={i} className="flex justify-between"><dt>{l.label}</dt><dd>{money(l.cents)}</dd></div>)}
                <div className="flex justify-between font-semibold"><dt>Total</dt><dd>{money(e.pricing.total_cents)}</dd></div>
                {e.paid_cents > 0 && <div className="flex justify-between text-muted-foreground"><dt>{es ? "Pagado" : "Paid"}</dt><dd>{money(e.paid_cents)}</dd></div>}
              </dl>
              {e.pricing.note && <p className="mt-2 text-xs text-muted-foreground">{e.pricing.note}</p>}
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {e.classroom_url && <a href={e.classroom_url}><Button><GraduationCap className="h-4 w-4" />{es ? "Entrar al aula virtual" : "Open my classroom"}</Button></a>}
              {(e.status === "offered" || (e.status === "pending" && !params.get("session_id"))) && (
                <Button onClick={pay} disabled={busy}>{busy && <Loader2 className="h-4 w-4 animate-spin" />}{es ? "Completar el pago" : "Complete payment"}</Button>
              )}
              <Link to={`/cursos/${e.course.slug}`}><Button variant="outline"><ExternalLink className="h-4 w-4" />{es ? "Ver el curso" : "See the course"}</Button></Link>
            </div>
            {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
          </div>

          {["pending", "waitlist", "offered", "confirmed"].includes(e.status) && (
            <div className="mt-6 rounded-2xl border p-6 text-sm">
              <p className="font-semibold">{es ? "¿No puedes asistir?" : "Can't attend?"}</p>
              <p className="mt-1 text-muted-foreground">{es ? "Política de reembolsos: " : "Refund policy: "}{e.course.refund_policy}</p>
              {e.status === "confirmed" && e.refund_due_cents > 0 && <p className="mt-1">{es ? "Según la política te corresponde hoy: " : "Under the policy you are due today: "}<b>{money(e.refund_due_cents)}</b></p>}
              {e.refund_requested_at ? (
                <p className="mt-3 text-primary">{es ? "Recibimos tu solicitud; el equipo procesará el reembolso." : "We received your request; the team will process the refund."}</p>
              ) : cancelling ? (
                <div className="mt-3 space-y-2">
                  <Textarea rows={2} value={reason} onChange={(ev) => setReason(ev.target.value)} placeholder={es ? "Motivo (opcional)" : "Reason (optional)"} />
                  <div className="flex gap-2">
                    <Button variant="destructive" onClick={cancel} disabled={busy}>{e.status === "confirmed" ? (es ? "Solicitar cancelación y reembolso" : "Request cancellation and refund") : es ? "Cancelar inscripción" : "Cancel enrollment"}</Button>
                    <Button variant="outline" onClick={() => setCancelling(false)}>{es ? "Volver" : "Back"}</Button>
                  </div>
                </div>
              ) : (
                <Button variant="outline" className="mt-3" onClick={() => setCancelling(true)}>{es ? "Cancelar mi inscripción" : "Cancel my enrollment"}</Button>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
