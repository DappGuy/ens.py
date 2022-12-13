from web3 import Web3
import re

# define pattern to search for in address
pattern = "^0x420DAB"

# connect to Ethereum network
web3 = Web3(Web3.HTTPProvider('https://mainnet.infura.io'))

# generate random private keys until a matching address is found
while True:
    # generate random private key
    priv_key = web3.eth.account.create().privateKey

    # compute public key and address
    account = web3.eth.account.privateKeyToAccount(priv_key)
    pub_key = account.address
    address = account.address

    # check if address matches pattern
    if re.match(pattern, address):
        # output matching address and private key as hex strings
        print(f"Address: 0x{hex(int(address, 16))[2:]}")
        print(f"Private Key: 0x{hex(int(priv_key.hex(), 16))[2:]}")
        break

