# license-NFT
A dapp where users can create license and upload it to IPFS.

# License Maker NFT
A dapp where users can use License template to create License and upload it to IPFS

## Features
- Users can create Licenses and upload it to IPFS
- User can use License borders that are created by designers
- User can mint License as NFT
- Developers can see a list of bounties and choose which bounties to work on.
- Designers can earn cryptos when someone used their License borders to mint NFT of Licenses.
- User will need to purchase membership to see all License borders.



## Technologies
- React
- semantic-ui
- Node.js
- nft.storage (Store Licenses and its metadata)
- slate.host (Store License borders)
- Polygon (Deploy the contract on Polygon Testnet for cheap gas fee)
- Chainlink (Price Feed)
- Unlock (Using Unlock's Paywall to get user to pay membership to access all License templates)

## Running the dapp on local host
- Clone or download this repository
- Run `npm i` to install the dependencies
- Install and open up Ganache and click "Quickstart"
- Run `truffle migrate` to deploy the contract
- Create a file called 'config.js' on the src folder and add the following code
```
export const SLATEAPIKEY = "< Create API key from slate.host >";
export const LicenseTEMPLATE_COLLECTIONID = "<Get Collection ID from slate.host>";
export const SERVER_URL = "http://localhost:4000/";
```
- Create a file called '.env' on the root folder and add the following code
```
NFTSTORAGE_APIKEY =  "< Create API key from nft.storage >";
MNEMONIC=< Your mnemonic >
ALCHEMYAPI_KEY = < Your Alchemy API key >
```
- Run `npm start` to start the dapp
