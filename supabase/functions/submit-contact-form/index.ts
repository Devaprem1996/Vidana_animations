import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, mobile, message } = await req.json();
    console.log('Received contact form submission:', { name, email, mobile, message });

    // Retrieve Airtable API key and Base ID from environment variables
    const AIRTABLE_API_KEY = Deno.env.get('AIRTABLE_API_KEY');
    const AIRTABLE_BASE_ID = Deno.env.get('AIRTABLE_BASE_ID');
    const AIRTABLE_TABLE_NAME = 'Contacts'; // Ensure this matches your Airtable table name exactly

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      console.error('Environment variables AIRTABLE_API_KEY or AIRTABLE_BASE_ID are not set.');
      return new Response(
        JSON.stringify({ error: 'Server configuration error: Missing Airtable credentials.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    const airtableApiUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;
    console.log('Attempting to send data to Airtable URL:', airtableApiUrl);

    const airtableResponse = await fetch(airtableApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          ContactName: name,
          ContactEmail: email,
          ContactMobile: mobile,
          ContactMessage: message,
          SubmissionTimestamp: new Date().toISOString(),
        },
      }),
    });

    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.json();
      console.error('Airtable API request failed with status:', airtableResponse.status, 'Error data:', errorData);
      // Return a more user-friendly error message without exposing raw Airtable error details
      return new Response(
        JSON.stringify({ error: 'Failed to submit form to Airtable. Please check server logs for details.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: airtableResponse.status }
      );
    }

    const responseData = await airtableResponse.json();
    console.log('Form submitted successfully to Airtable:', responseData);

    return new Response(JSON.stringify({ message: 'Form submitted successfully!', data: responseData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error processing request in Edge Function:', error.message);
    return new Response(JSON.stringify({ error: 'Internal server error.' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});