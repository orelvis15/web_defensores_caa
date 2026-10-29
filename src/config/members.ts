// Portal de miembros (miembro.defensorescaa.org): membresía paga, solicitudes
// de ayuda y las APIs públicas (directorio de embajadores, galerías).
export const MEMBERS_URL = (import.meta.env.VITE_MEMBERS_URL as string | undefined)?.replace(/\/$/, "") || "https://miembro.defensorescaa.org";

export const membershipUrl = (dollars?: number) =>
  `${MEMBERS_URL}/membresia${dollars ? `?amount=${dollars}` : ""}`;

export const aidRequestUrl = `${MEMBERS_URL}/solicitar-ayuda`;

export async function membersApi<T>(path: string): Promise<T> {
  const res = await fetch(`${MEMBERS_URL}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}
