from web3 import Web3
from ens import ENS
import time

# set up web3 instance and connect to Ethereum network
web3 = Web3(Web3.HTTPProvider('https://mainnet.infura.io'))

# set up ENS instance
ens = ENS(web3)

# define current time and time 24 hours from now
now = time.time()
expiration = now + (24 * 60 * 60)

# get all ENS domains that expire within 24 hours
owner = ens.owner()

# filter owner's domains by expiration
expiring_domains = filter(lambda domain: domain.expiry == expiration, owner.domains)

print(expiring_domains)

