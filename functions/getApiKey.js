// Serverless function to provide TMDB API key
exports.handler = async function(event, context) {
  // Set CORS headers for browser clients
  const headers = {
    'Access-Control-Allow-Origin': '*', // In production, restrict this to your domain
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };
  
  // Check request method for preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight successful' })
    };
  }
  
  try {
    // In a real production environment, you would use environment variables
    // and proper authentication to control API key access
    const apiKey = process.env.TMDB_API_KEY || 'f81980ff410e46f422d64ddf3a56dddd';
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ apiKey })
    };
  } catch (error) {
    console.error('Error in getApiKey function:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to get API key' })
    };
  }
}; 