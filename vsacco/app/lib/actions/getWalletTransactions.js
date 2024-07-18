const getWalletTransactions = async (wallet_id) =>{
    try{
      const response = await fetch(`/api/instasend/wallets/wallettrans?wallet_id=${wallet_id}`);
      // if (response) console.log("Response Transactions-----",response)
      if (response.ok) {
        const { data } = await response.json();

        // Filtering transactions that have an invoice
        const filteredTransactions = data.results.filter(transaction => transaction.invoice !== null);
        console.log("Filtered Transactions-----",filteredTransactions)
        return filteredTransactions
      } else {
        console.error('Failed to fetch wallet data:', response.statusText);
      }
    }catch(error){
      console.log('Some error occured before fetching wallet data',error)
    }
  }