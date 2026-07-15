import { NextResponse } from "next/server";
import { Resend } from "resend";
import { soumissionSchema, serviceLabels, proprieteLabels } from "@/lib/soumission-schema";
import { site } from "@/lib/site";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = soumissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Formulaire invalide.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Honeypot : si rempli, on fait comme si tout allait bien (bot silencieux).
  if (data.entreprise && data.entreprise.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  // Sans clé configurée, on ne bloque pas l'utilisateur : on journalise et on confirme.
  // (À configurer en production — voir README.)
  if (!apiKey) {
    console.warn(
      "[soumission] RESEND_API_KEY manquante — demande reçue mais non envoyée par courriel :",
      JSON.stringify(data)
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  const resend = new Resend(apiKey);
  const from = process.env.SOUMISSION_FROM ?? "Vision Lavage <onboarding@resend.dev>";
  const to = process.env.SOUMISSION_TO ?? site.email;

  const servicesTxt = data.services.map((s) => serviceLabels[s]).join(", ");
  const html = `
    <div style="font-family:system-ui,sans-serif;color:#12303a;max-width:560px">
      <h2 style="color:#178886">Nouvelle demande de soumission</h2>
      <table style="border-collapse:collapse;width:100%">
        <tbody>
          ${row("Nom", data.nom)}
          ${row("Téléphone", data.telephone)}
          ${row("Courriel", data.courriel || "—")}
          ${row("Ville", data.ville)}
          ${row("Type", proprieteLabels[data.typePropriete])}
          ${row("Services", servicesTxt)}
          ${row("Message", data.message || "—")}
        </tbody>
      </table>
      <p style="color:#47606b;font-size:13px;margin-top:20px">
        Envoyé depuis visionlavage.ca
      </p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.courriel || undefined,
      subject: `Soumission — ${data.nom} (${data.ville}) · ${servicesTxt}`,
      html,
    });
    if (error) {
      console.error("[soumission] Erreur Resend :", error);
      return NextResponse.json({ error: "Envoi impossible pour le moment." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[soumission] Exception :", err);
    return NextResponse.json({ error: "Envoi impossible pour le moment." }, { status: 502 });
  }
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 12px;background:#f3e6cd;font-weight:600;border:1px solid #e7d3ae;white-space:nowrap">${label}</td>
    <td style="padding:8px 12px;border:1px solid #e7d3ae">${escapeHtml(value)}</td>
  </tr>`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
