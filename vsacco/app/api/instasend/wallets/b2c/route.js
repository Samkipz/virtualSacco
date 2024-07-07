const IntaSend = require('intasend-node');

const intasend = new IntaSend(/*...Authenticate*/)

let payouts = intasend.payouts();

payouts
    .mpesa({
      currency: 'KES',
      transactions: [{
        name: 'Joe Doe',
        account: '254708374149',
        amount: '1000',
        narrative: 'Reason for payment'
      }],
      wallet_id:"<wallet_id>"
    })
    .then((resp) => {
      console.log(`Payouts response:`, resp);
      // Approve payouts method can be called here if you would
      // like to auto-approve immediately
    })
    .catch((err) => {
      console.error(`Payouts error:`, err);
    });