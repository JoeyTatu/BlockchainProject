// In MetaMask -> number of Ethereum addresss
// This file creates those addresses

// Packages:
// BIP39 - Seed phrase
// BIP44 - Path

// Generating ETH addresss:
// // Use sepc246K1 keypair
// // Use public key on keccak256 to hash it.
// // Remove first 12 bytes

// Load dependencies
require('dotenv').config();
const Wallet = require("ethereumjs-wallet").default;
const keccak256 = require('keccak256');
const bip39 = require("bip39");
const { hdkey } = require('ethereumjs-wallet');
// Do not use {hdkey}

const PASSPHRASE = process.env.PASSPHRASE;

// Get Wallet
const getWallet = async() => {

    // Print to console async has started
    console.log("WALLET: Async start - Standard Wallet");

    // Generate Wallet
    const wallet = Wallet.generate();

    // Assign public key
    const publicKey = wallet.getPublicKey()

    // Convert to hashed public key
    const hashedPublicKey = keccak256(publicKey).toString('hex');

    // Print hashed public key to console
    console.log(`Hashed public key: 0x${hashedPublicKey}`);

    // Remove first 12 bytes
    const ethAddress = hashedPublicKey.substring(24);

    // Print Eth address to console
    console.log(`Eth address: 0x${ethAddress}`);

    // Get private key and assign it
    const privateKey = wallet.getPrivateKey();

    // Print private key to console
    console.log(`Private key: 0x${privateKey.toString('hex')}`);

}

// Calling getwallet function
getWallet();

// Added new line break to seperate wallet outputs
console.log(`----------------`);

// Creating a deterministic/HD wallet
const getHDWallet = async() => {

    // Output to console
    console.log(`HD WALLET: Creating HD wallet`);

    // Set passphrase
    // Passphrase retrieved from MetaMask
    // Passphrase can also be called a mnemonic
    // It's not good practise to hard code seed phrase
    const passphrase = PASSPHRASE;

    // Converts passphrase to seed
    // "await" waits for correct seed before assignment.
    let seed = await bip39.mnemonicToSeed(passphrase);

    // Generate HD wallet
    let hdWallet = hdkey.fromMasterSeed(seed);
    
    // Set path
    const path = "m/44'/60'/0'/0/0";

    // If wanted more than one path, increment last number, e.g.
    const path2 = "m/44'/60'/0'/0/1";

    // Generate wallet and assign
    const wallet = await hdWallet.derivePath(path).getWallet();

    // Get public key
    const publicKey = wallet.getPublicKey();

    // Hash public key
    const hashedPublicKey = keccak256(publicKey).toString('hex');

    // Print hashed public key
    console.log(`Hashed public key: 0x${hashedPublicKey}`);

    // Remove last 12 bytes to get eth address
    const ethAddress = hashedPublicKey.substring(24);

    // Print eth address
    console.log(`Eth address: 0x${ethAddress}`);
}

getHDWallet();
