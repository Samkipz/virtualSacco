export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { firstname, othernames, gender, dob, email, phone1, phone2, password1, password2, terms } = req.body;
  
      // Simulating a createUser function, replace this with your actual logic
      async function createUser(data) {
        // Your server-side logic here
        console.log('User data received:', data);
      }
  
    //   try {
    //     await createUser({ firstname, othernames, gender, dob, email, phone1, phone2, password1, password2, terms });
    //     res.status(200).json({ message: 'User created!' });
    //   } catch (error) {
    //     res.status(500).json({ error: 'Error creating user' });
    //   }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }
  