// In MetaMask -> number of Ethereum addresss
// This file creates those addresses

// Packages:
// BIP39 - Seed phrase
// BIP44 - Path

// Generating ETH addresss:
// Use sepc246K1 keypair
// Use public key on keccak256 to hash it.
// Remove first 12 bytes

// Load dependencies
const Wallet = require("ethereumjs-wallet").default;
const kec = require('keccak256');
const bip39 = require("bip39");
const { hdkey } = require('ethereumjs-wallet');

// Get Wallet
const getWallet = async() => {

    // Print to console async has started
    console.log("Async start");

    // Generate Wallet
    const wallet = Wallet.generate();

    // Generate public key
    const publicKey = wallet.getPublicKey()

    // Convert to hashed public key
    const hashedPublicKey = kec(publicKey).toString('hex');

    // Print hashed public key to console
    console.log(`Hashed public key: 0x${hashedPublicKey}`);

    // Remove first 12 bytes
    const ethAddress = hashedPublicKey.substring(24);

    // Print Eth address to console
    console.log(`Eth address: 0x${ethAddress}`);
}