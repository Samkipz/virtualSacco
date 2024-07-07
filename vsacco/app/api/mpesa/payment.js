export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
  
    const { token } = req.body;
  
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    // Set up your payment request parameters here
    const paymentData = {
      // ... your payment data
    };
  
    try {
      const response = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
        method: 'POST',
        headers,
        body: JSON.stringify(paymentData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
}