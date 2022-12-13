import web3
import re

# define pattern to search for in address
pattern = "^0x1[a-zA-Z0-9]{3,}$"

# connect to Ethereum network
web3 = Web3(Web3.HTTPProvider('https://mainnet.infura.io'))

# generate random private keys until a matching address is found
while True:
    # generate random private key
    priv_key = web3.eth.account.create().privateKey

    # compute public key and address
    pub_key = web3.eth.account.privateKeyToAccount(priv_key).publicKey
    address = web3.eth.account.privateKeyToAccount(priv_key).address

    # check if address matches pattern
    if re.match(pattern, address):
        # output matching address
        print(address)
        break
