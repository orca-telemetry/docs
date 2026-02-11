import { Context } from '@netlify/functions'

export default async (request: Request, context: Context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request for CORS
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }), 
      { status: 405, headers }
    );
  }

  try {
    // Parse request body
    const body = await request.json();
    const { email, formtype } = body;
    
    // Validate input
    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }), 
        { status: 400, headers }
      );
    }

    // Get API key
    const apiKey = process.env.MAILER_LITE_API_KEY;
    if (!apiKey) {
      console.error('MAILER_LITE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }), 
        { status: 500, headers }
      );
    }

    // Prepare MailerLite payload
    const payload: any = {
      email: email,
      status: 'active'
    };

    // Optionally add formtype as a custom field
    if (formtype) {
      payload.fields = {
        formtype: formtype
      };
    }

    // Send to MailerLite API
    const mailerliteResponse = await fetch(
      'https://connect.mailerlite.com/api/subscribers',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
      }
    );

    const responseData = await mailerliteResponse.json();

    if (mailerliteResponse.ok) {
      // Success - either 200 (updated) or 201 (created)
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Subscribed successfully',
          data: responseData
        }), 
        { status: 200, headers }
      );
    } else {
      // Handle MailerLite errors
      console.error('MailerLite error:', responseData);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to subscribe',
          details: responseData.message || 'Unknown error'
        }), 
        { status: mailerliteResponse.status, headers }
      );
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { status: 500, headers }
    );
  }
}
