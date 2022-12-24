const Web3 = require('web3');

// Connect to the Ethereum JSON-RPC endpoint
const web3 = new Web3('https://testnet.diora.network');
async function checkRpc() {
  try {
    // Check if the endpoint is available
    const isConnected = await web3.eth.net.isListening();
    if (!isConnected) {
      throw new Error('Unable to connect to the Ethereum JSON-RPC endpoint');
    }

    // Check the current gas price
    const gasPrice = await web3.eth.getGasPrice();
    console.log(`Current gas price: ${gasPrice} wei`);

    // Check the Ethereum chain ID
    const chainId = await web3.eth.net.getId();
    console.log(`Ethereum chain ID: ${chainId}`);

    // Query the latest block number
    const blockNumber = await web3.eth.getBlockNumber();
    console.log(`Latest block number: ${blockNumber}`);

    // Query the balance of the account
    const balance = await web3.eth.getBalance('0xe782fE6487d55904244A955775da4662220Bb2AB');
    console.log(`Balance: ${balance} wei`);

    // Subscribe to new blocks
    const subscription = web3.eth.subscribe('newBlockHeaders');
    subscription.on('data', (blockHeader) => {
      console.log(`New block received: ${blockHeader.number}`);
    });

  } catch (error) {
    console.error(error);
  }
}

checkRpc();
