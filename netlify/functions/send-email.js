const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'el.elhadji.dieng@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { type } = body;

    if (type === 'contact') {
      const { name, email, subject, message } = body;

      if (!name || !email || !subject || !message) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Tous les champs sont requis.' }),
        };
      }

      // Email principal au propriétaire
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [OWNER_EMAIL],
        subject: `[CONTACT] ${subject}`,
        html: `
          <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #1a237e, #283593); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Nouveau Message de Contact</h1>
            </div>
            <div style="padding: 30px;">
              <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <p style="margin: 8px 0;"><strong>👤 Nom:</strong> ${name}</p>
                <p style="margin: 8px 0;"><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p style="margin: 8px 0;"><strong>📝 Sujet:</strong> ${subject}</p>
                <p style="margin: 8px 0;"><strong>⏰ Date:</strong> ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Dakar' })}</p>
              </div>
              <div style="background: #fafafa; border-left: 4px solid #ff6f00; padding: 20px; border-radius: 4px;">
                <h3 style="margin-top: 0; color: #1a237e;">Message:</h3>
                <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
              </div>
            </div>
            <div style="background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #888;">
              Envoyé depuis le portfolio — elhadji-dieng.com
            </div>
          </div>
        `,
        replyTo: email,
      });

      // Email de confirmation à l'expéditeur
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: 'Confirmation de votre message — El Hadji Dieng',
        html: `
          <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #1a237e, #283593); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Message bien reçu !</h1>
            </div>
            <div style="padding: 30px;">
              <p>Bonjour <strong>${name}</strong>,</p>
              <p>Merci pour votre message concernant "<strong>${subject}</strong>".</p>
              <p>Je vous répondrai dans les plus brefs délais.</p>
              <br/>
              <p>Cordialement,</p>
              <p><strong>El Hadji Dieng</strong><br/>Web Master Professionnel</p>
            </div>
            <div style="background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #888;">
              elhadji-dieng.com
            </div>
          </div>
        `,
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Message envoyé avec succès.' }),
      };

    } else if (type === 'quote') {
      const { name, email, phone, company, service, budget, timeline, message } = body;

      if (!name || !email || !service || !message) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Les champs obligatoires sont requis.' }),
        };
      }

      await resend.emails.send({
        from: FROM_EMAIL,
        to: [OWNER_EMAIL],
        subject: `[DEVIS] Demande de ${name} — ${service}`,
        html: `
          <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #ff6f00, #e65100); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Nouvelle Demande de Devis</h1>
            </div>
            <div style="padding: 30px;">
              <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <h3 style="color: #1a237e; margin-top: 0;">Informations Client</h3>
                <p style="margin: 8px 0;"><strong>👤 Nom:</strong> ${name}</p>
                <p style="margin: 8px 0;"><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
                ${phone ? `<p style="margin: 8px 0;"><strong>📱 Téléphone:</strong> ${phone}</p>` : ''}
                ${company ? `<p style="margin: 8px 0;"><strong>🏢 Entreprise:</strong> ${company}</p>` : ''}
              </div>
              <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <h3 style="color: #1a237e; margin-top: 0;">Détails du Projet</h3>
                <p style="margin: 8px 0;"><strong>🛠️ Service:</strong> ${service}</p>
                ${budget ? `<p style="margin: 8px 0;"><strong>💰 Budget:</strong> ${budget}</p>` : ''}
                ${timeline ? `<p style="margin: 8px 0;"><strong>📅 Délai:</strong> ${timeline}</p>` : ''}
                <p style="margin: 8px 0;"><strong>⏰ Date:</strong> ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Dakar' })}</p>
              </div>
              <div style="background: #fafafa; border-left: 4px solid #ff6f00; padding: 20px; border-radius: 4px;">
                <h3 style="margin-top: 0; color: #1a237e;">Description du Projet:</h3>
                <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
              </div>
            </div>
            <div style="background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #888;">
              Envoyé depuis le portfolio — elhadji-dieng.com
            </div>
          </div>
        `,
        replyTo: email,
      });

      // Confirmation au client
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: 'Confirmation de votre demande de devis — El Hadji Dieng',
        html: `
          <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #ff6f00, #e65100); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Demande de Devis Reçue</h1>
            </div>
            <div style="padding: 30px;">
              <p>Bonjour <strong>${name}</strong>,</p>
              <p>Votre demande de devis pour le service "<strong>${service}</strong>" a bien été reçue.</p>
              <p>Je l'étudierai avec attention et vous recontacterai dans les 24 à 48 heures avec une proposition détaillée.</p>
              <br/>
              <p>Cordialement,</p>
              <p><strong>El Hadji Dieng</strong><br/>Web Master Professionnel</p>
            </div>
            <div style="background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #888;">
              elhadji-dieng.com
            </div>
          </div>
        `,
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Demande de devis envoyée avec succès.' }),
      };

    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Type de formulaire invalide.' }),
      };
    }

  } catch (error) {
    console.error('Resend error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erreur serveur. Veuillez réessayer plus tard.' }),
    };
  }
};
