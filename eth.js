const Web3 = require('web3');
const fs = require('fs');
const csv = require('csv-parser');

// Connect to an Infura endpoint
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

async function sendEth(recipients, amount, privateKey) {
  for (const recipient of recipients) {
    // Construct the transaction object
    const txData = {
      from: '0x2077BD7011DaCD7bc649Ae8cb543D21017f1815E',
      to: recipient,
      value: web3.utils.toWei(amount, 'ether'),
      gas: '21000',
      gasPrice: '1000000000' // 1 Gwei
    };

    // Sign the transaction
    const signedTx = await web3.eth.accounts.signTransaction(txData, privateKey);

    // Send the signed transaction
    const tx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(`Transaction hash: ${tx.transactionHash}`);
  }
}

async function main() {
  const recipients = [];

  // Read the recipient addresses from the CSV file
  await new Promise((resolve, reject) => {
    fs.createReadStream('recipients.csv')
      .pipe(csv())
      .on('data', (row) => recipients.push(row.address))
      .on('error', reject)
      .on('end', resolve);
  });

  // Send ETH to the recipients
  await sendEth(recipients, '0.1', 'YOUR_PRIVATE_KEY');
  console.log('Transactions sent successfully!');
}

main()
  .then(() => {
    console.log('Done!');
  })
  .catch((error) => {
    console.error(error);
  });
