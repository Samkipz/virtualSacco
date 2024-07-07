import axios from 'axios';

export default async function handler(req, res) {
  const auth = new Buffer(`${process.env.MPESA_API_KEY}:${process.env.MPESA_API_SECRET}`).toString('base64');

  try {
    const response = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`
      }
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const data = await response.json();
    res.status(200).json({ token: data.access_token });
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
  }
  
}