const { ApiPromise } = require('@polkadot/api');

async function main() {
  // Connect to a remote Substrate node
  const api = await ApiPromise.create({
    provider: 'wss://dev.diora.network'
  });

  console.log('Connected to the Substrate node!');

  // Disconnect from the node when the script is finished
  api.disconnect();
}

main().catch(console.error);
