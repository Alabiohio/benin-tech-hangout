interface SuresendContact {
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
    company?: string;
}

interface SuresendMetadata {
    source?: string;
    external_user_id?: string;
    [key: string]: any;
}

export async function triggerSuresendWebhook(contact: SuresendContact, metadata?: SuresendMetadata) {
    const webhookUrl = 'https://api.suresendapi.com/developer/automations/webhook/wh_d7e50f07f287c5b69cfb86b4656fe3c8a3f6';
    const apiKey = process.env.SURESEND_API_KEY;

    if (!apiKey) {
        console.warn('SURESEND_API_KEY is not defined in environment variables. Webhook skipped.');
        return;
    }

    try {
        const payload = {
            event: "user.registered",
            contact: {
                email: contact.email,
                first_name: contact.first_name,
                last_name: contact.last_name,
                phone: contact.phone || "",
                company: contact.company || ""
            },
            metadata: {
                source: metadata?.source || "benin-tech-fest-website",
                ...metadata
            }
        };

        const res = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const errText = await res.text();
            console.error(`Suresend webhook response error (${res.status}):`, errText);
        } else {
            console.log(`Suresend webhook triggered successfully for ${contact.email}`);
        }
    } catch (err) {
        console.error('Failed to trigger Suresend webhook:', err);
    }
}
