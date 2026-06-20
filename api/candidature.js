export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST uniquement' });

  const { prenom, nom, email, tel, ville, hasShow, type, stage, exp, video, extra, idea } = req.body;
  if (!prenom || !nom || !email) return res.status(400).json({ error: 'Champs obligatoires manquants' });

  const typeLabel = { oneman: 'One-man show', onewoman: 'One-woman show', duo: 'Duo', autre: 'Autre' }[type] || '—';
  const hasLabel = { oui: 'Oui, en cours', idee: 'Une idée mais rien d\'écrit', non: 'Non' }[hasShow] || '—';
  const expList = Array.isArray(exp) && exp.length ? exp.join(', ') : '—';

  const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:32px 20px">

  <div style="text-align:center;margin-bottom:32px">
    <div style="display:inline-block;padding:8px 20px;border-radius:100px;background:#0C0816;color:#fff;font-size:13px;font-weight:600;letter-spacing:.08em">PRODVOCATION</div>
  </div>

  <div style="background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.06)">
    <div style="background:linear-gradient(135deg,#FF8A3D,#EB2348,#C2185B);padding:28px 32px">
      <h1 style="margin:0;font-size:22px;font-weight:600;color:#fff;letter-spacing:-.02em">Nouvelle candidature artiste</h1>
      <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,.8)">${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
    </div>

    <div style="padding:28px 32px">
      <h2 style="font-size:13px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#86868b;margin:0 0 16px">Identité</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:10px 0;font-size:14px;color:#86868b;width:120px;vertical-align:top">Nom</td><td style="padding:10px 0;font-size:15px;font-weight:600;color:#1d1d1f">${prenom} ${nom}</td></tr>
        <tr><td style="padding:10px 0;font-size:14px;color:#86868b;border-top:1px solid #f0f0f2;vertical-align:top">Email</td><td style="padding:10px 0;font-size:15px;color:#1d1d1f;border-top:1px solid #f0f0f2"><a href="mailto:${email}" style="color:#EB2348;text-decoration:none">${email}</a></td></tr>
        <tr><td style="padding:10px 0;font-size:14px;color:#86868b;border-top:1px solid #f0f0f2;vertical-align:top">Téléphone</td><td style="padding:10px 0;font-size:15px;color:#1d1d1f;border-top:1px solid #f0f0f2"><a href="tel:${tel}" style="color:#EB2348;text-decoration:none">${tel}</a></td></tr>
        <tr><td style="padding:10px 0;font-size:14px;color:#86868b;border-top:1px solid #f0f0f2;vertical-align:top">Ville</td><td style="padding:10px 0;font-size:15px;color:#1d1d1f;border-top:1px solid #f0f0f2">${ville}</td></tr>
      </table>
    </div>

    <div style="padding:0 32px 28px">
      <div style="height:1px;background:#f0f0f2;margin-bottom:28px"></div>
      <h2 style="font-size:13px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#86868b;margin:0 0 16px">Projet</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:10px 0;font-size:14px;color:#86868b;width:120px;vertical-align:top">Spectacle</td><td style="padding:10px 0;font-size:15px;font-weight:600;color:#1d1d1f">${hasLabel}</td></tr>
        <tr><td style="padding:10px 0;font-size:14px;color:#86868b;border-top:1px solid #f0f0f2;vertical-align:top">Type</td><td style="padding:10px 0;font-size:15px;color:#1d1d1f;border-top:1px solid #f0f0f2">${typeLabel}</td></tr>
        <tr><td style="padding:10px 0;font-size:14px;color:#86868b;border-top:1px solid #f0f0f2;vertical-align:top">Avancement</td><td style="padding:10px 0;font-size:15px;color:#1d1d1f;border-top:1px solid #f0f0f2">${stage || '—'}</td></tr>
        ${idea ? `<tr><td style="padding:10px 0;font-size:14px;color:#86868b;border-top:1px solid #f0f0f2;vertical-align:top">Idée</td><td style="padding:10px 0;font-size:15px;color:#1d1d1f;border-top:1px solid #f0f0f2">${idea}</td></tr>` : ''}
      </table>
    </div>

    <div style="padding:0 32px 28px">
      <div style="height:1px;background:#f0f0f2;margin-bottom:28px"></div>
      <h2 style="font-size:13px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#86868b;margin:0 0 16px">Ambitions</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:10px 0;font-size:14px;color:#86868b;width:120px;vertical-align:top">Attentes</td><td style="padding:10px 0;font-size:15px;color:#1d1d1f">${expList}</td></tr>
        <tr><td style="padding:10px 0;font-size:14px;color:#86868b;border-top:1px solid #f0f0f2;vertical-align:top">Vidéo</td><td style="padding:10px 0;font-size:15px;color:#1d1d1f;border-top:1px solid #f0f0f2">${video ? `<a href="${video}" style="color:#EB2348;text-decoration:none">${video}</a>` : '—'}</td></tr>
        ${extra ? `<tr><td style="padding:10px 0;font-size:14px;color:#86868b;border-top:1px solid #f0f0f2;vertical-align:top">Message</td><td style="padding:10px 0;font-size:15px;color:#1d1d1f;border-top:1px solid #f0f0f2">${extra}</td></tr>` : ''}
      </table>
    </div>

    <div style="padding:20px 32px;background:#f9f9fb;border-top:1px solid #f0f0f2;text-align:center">
      <a href="mailto:${email}" style="display:inline-block;padding:12px 28px;border-radius:100px;background:linear-gradient(135deg,#FF8A3D,#C2185B);color:#fff;font-size:14px;font-weight:600;text-decoration:none">Répondre à ${prenom}</a>
    </div>
  </div>

  <p style="text-align:center;font-size:12px;color:#a1a1a6;margin-top:24px">Candidature reçue via prodvocation.com</p>
</div>
</body>
</html>`;

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: { name: 'ProdVocation', email: 'contact@standupacademy.fr' },
        to: [{ email: 'marketing@treenity-group.com', name: 'Marketing Treenity' }],
        replyTo: { email, name: `${prenom} ${nom}` },
        subject: `Candidature artiste : ${prenom} ${nom} — ${typeLabel}`,
        htmlContent
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: 'Erreur Brevo', details: err });
    }

    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
