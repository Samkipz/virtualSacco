// app/api/mpesa/generateToken.js

export const generateToken = async () => {
    const { MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET } = process.env;
    const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');
  
    try {
      const response = await fetch(
        'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
        {
          method: 'GET',
          headers: {
            Authorization: `Basic ${auth}`,
          },
        }
      );
  
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      throw new Error(`Failed to generate access token: ${error.message}`);
    }
};