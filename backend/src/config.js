require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Crypto Arabs";
const description = `For the first time in history, an Arabic Cartoon show “Shaabiat Al Cartoon” has been turned into an NFT collection consisting of 9,999 unique art pieces that have been derived from the 10 main characters within the show.\
Crypto Arabs NFTs are not only a collectable asset, they also give you access to our founders and their network of industry leaders. Their vision is to educate the world about Web 3.0, plus each NFT purchase is a donation to charity.\
Be part of the movement.`;
const baseUri = "ipfs://NewUriToReplace"; // This will be replaced automatically

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  // {
  //   growEditionSizeTo: 1000,
  //     layersOrder: [
  //       { name: "Background" },
  //       { name: "Eyeball" },
  //       { name: "Eye color" },
  //       { name: "Iris" },
  //       { name: "Shine" },
  //       { name: "Bottom lid" },
  //       { name: "Top lid" },
  //     ],
  // }
  {
    growEditionSizeTo: 3,
    layersOrder: [
      { name: "Affari_Base" },
      { name: "Affari_Clothes" },
      { name: "Affari_Head" },
      { name: "Affari_Eyewear" },
      { name: "Affari_Neckwear" },
      { name: "Affari_back_accessories" },
      { name: "Affari_Hand_accessories" },
      { name: "Affari_Shoes_and_sneakers" }
    ],
  },
  // {
  //   growEditionSizeTo: 4000,
  //   layersOrder: [
  //     { name: "Atooga_Base" },
  //     { name: "Atooga_T-shirts" },
  //     { name: "Atooga_Head" },
  //     { name: "Atooga_Eyewear" },
  //     { name: "Atooga_Neckwear" },
  //     { name: "Atooga_back_accessories" },
  //     { name: "Atooga_Hand_accessories" }
  //   ],
  // },
  // {
  //   growEditionSizeTo: 6000,
  //   layersOrder: [
  //     { name: "Sabtu_Base" },
  //     { name: "Sabtu_T-shirt" },
  //     { name: "Sabtu_Head" },
  //     { name: "Sabtu_Eyewear" },
  //     { name: "Sabtu_Neckwear" },
  //     { name: "Sabtu_Back_accessories" },
  //     { name: "Sabtu_Shoes_and_sneakers" }
  //   ],
  // },
  // {
  //   growEditionSizeTo: 10000,
  //   layersOrder: [
  //     { name: "Shambeh_Base" },
  //     { name: "Shambeh_T-shirt" },
  //     { name: "Shambeh_Head" },
  //     { name: "Shambeh_baker_Eyewear" },
  //     { name: "Shambeh_Neckwear" },
  //     { name: "Shambeh_back_accessories" },
  //     { name: "Shambeh_Shoes_and_sneakers" }
  //   ],
  // },
];

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 512,
  height: 512,
  smoothing: false,
};

const extraMetadata = {
  external_url: "https://cryptoarabs.art", // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Set this in the .env file to prevent exposing your API key when pushing to Github
const LIMIT = 2; // Your API key rate limit
const CHAIN = 'rinkeby'; // only rinkeby or polygon

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'CRYPTOARABS';
const CONTRACT_SYMBOL = 'CA';
const METADATA_UPDATABLE = true; // set to false if you don't want to allow metadata updates after minting
const OWNER_ADDRESS = '0x5e7a9c8B2E11684Ca2852218FDA21C1132c6f9A5';
const TREASURY_ADDRESS = '0x5e7a9c8B2E11684Ca2852218FDA21C1132c6f9A5';
const MAX_SUPPLY = 5000; // The maximum number of NFTs that can be minted. CANNOT BE UPDATED!
const MINT_PRICE = 0.03; // Minting price per NFT. Rinkeby = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const TOKENS_PER_MINT = 10; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!

// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PUBLIC_MINT_START_DATE = "2022-04-19T11:30:48+00:00"; // This is required. Eg: 2022-02-08T11:30:48+00:00

// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = "2022-04-19T11:30:48+00:00"; // Optional. Eg: 2022-02-08T11:30:48+00:00
const ROYALTY_SHARE = 1000; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0x5e7a9c8B2E11684Ca2852218FDA21C1132c6f9A5"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the base uri
const PREREVEAL_TOKEN_URI = null; // only update if you want to manually set the prereveal token uri
const PRESALE_WHITELISTED_ADDRESSES = []; // only update if you want to manually set the whitelisted addresses

// ** OPTIONAL **
let CONTRACT_ADDRESS = "YOUR CONTRACT ADDRESS"; // If you want to manually include it

// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = true; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
const GENERIC_TITLE = "CRYPTOARABS"; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
const GENERIC_DESCRIPTION = `For the first time in history, an Arabic Cartoon show “Shaabiat Al Cartoon” has been turned into an NFT collection consisting of 9,999 unique art pieces that have been derived from the 10 main characters within the show.\
Crypto Arabs NFTs are not only a collectable asset, they also give you access to our founders and their network of industry leaders. Their vision is to educate the world about Web 3.0, plus each NFT purchase is a donation to charity.\
Be part of the movement.`; // Replace with what you want the generic descriptions to say.
const GENERIC_IMAGE = "https://ipfs.io/ipfs/QmQhXf3db4ByXCYFSScCj8ESVerU8mDN6suGaAubzhifw3"; // Replace with your generic image that will display for all NFTs pre-reveal.

// Automatically set contract address if deployed using the deployContract.js script
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK" && contractData.error === null) {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  CHAIN,
  GENERIC,
  GENERIC_TITLE,
  GENERIC_DESCRIPTION,
  GENERIC_IMAGE,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  MINT_PRICE,
  TOKENS_PER_MINT,
  PRESALE_MINT_START_DATE,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_WHITELISTED_ADDRESSES
};
