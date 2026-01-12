/**
 * Netlify Function - Meta Conversions API Proxy
 * Envia eventos de conversão para a API do Meta (Facebook)
 * Protege o Access Token mantendo-o apenas no servidor
 */

const crypto = require('crypto');

// Hash SHA256 para dados de usuário (exigido pela Meta CAPI)
function hashData(data) {
    if (!data) return null;
    const normalized = String(data).toLowerCase().trim();
    return crypto.createHash('sha256').update(normalized).digest('hex');
}

// Gerar event_id único
function generateEventId() {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

exports.handler = async (event, context) => {
    // Headers CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    // Apenas aceitar POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Credenciais via variáveis de ambiente
        const accessToken = process.env.META_ACCESS_TOKEN;
        const pixelId = process.env.META_PIXEL_ID;

        if (!accessToken || !pixelId) {
            console.error('META_ACCESS_TOKEN or META_PIXEL_ID not configured');
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Meta API not configured' })
            };
        }

        // Parsear body da requisição
        const requestBody = JSON.parse(event.body);
        const {
            event_name,
            user_data = {},
            custom_data = {},
            event_source_url,
            fbc,
            fbp
        } = requestBody;

        if (!event_name) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'event_name is required' })
            };
        }

        // Preparar dados do usuário com hash
        const hashedUserData = {};

        if (user_data.email) {
            hashedUserData.em = [hashData(user_data.email)];
        }
        if (user_data.phone) {
            // Remover caracteres não numéricos e adicionar código do país se não existir
            let phone = user_data.phone.replace(/\D/g, '');
            if (!phone.startsWith('55')) {
                phone = '55' + phone;
            }
            hashedUserData.ph = [hashData(phone)];
        }
        if (user_data.first_name) {
            hashedUserData.fn = hashData(user_data.first_name);
        }
        if (user_data.last_name) {
            hashedUserData.ln = hashData(user_data.last_name);
        }
        if (user_data.city) {
            hashedUserData.ct = hashData(user_data.city);
        }
        if (user_data.country) {
            hashedUserData.country = hashData(user_data.country);
        }

        // Adicionar fbc/fbp se disponível
        if (fbc) hashedUserData.fbc = fbc;
        if (fbp) hashedUserData.fbp = fbp;

        // Montar payload do evento
        const eventData = {
            event_name: event_name,
            event_time: Math.floor(Date.now() / 1000),
            event_id: generateEventId(),
            action_source: 'website',
            event_source_url: event_source_url || 'https://codigochina.com',
            user_data: hashedUserData
        };

        // Adicionar custom_data se houver
        if (Object.keys(custom_data).length > 0) {
            eventData.custom_data = custom_data;
        }

        // Adicionar attribution_data se fornecido
        if (requestBody.attribution_data) {
            eventData.attribution_data = requestBody.attribution_data;
        }

        // Adicionar original_event_data se fornecido
        if (requestBody.original_event_data) {
            eventData.original_event_data = requestBody.original_event_data;
        }

        // Payload para Meta API
        const metaPayload = {
            data: [eventData]
        };

        console.log('Sending event to Meta:', event_name);

        // Enviar para Meta Conversions API
        const metaUrl = `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`;

        const response = await fetch(metaUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(metaPayload)
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Meta API error:', response.status, responseData);
            return {
                statusCode: response.status,
                headers,
                body: JSON.stringify({
                    error: 'Meta API error',
                    details: responseData
                })
            };
        }

        console.log('Event sent successfully:', responseData);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                event_name: event_name,
                events_received: responseData.events_received || 1
            })
        };

    } catch (error) {
        console.error('Meta Conversions Proxy error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};
