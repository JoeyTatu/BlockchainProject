// Print to the console
console.log(`erc20_contract.js file`);

// We need:
// // infura token
// // contract token
// // owner address
// // private key for owner address (to sign txs)

// Need to access deployed smart contract
// Retreive its name, symbol, owner's balance.
// Read-only methods, no txs

// Add dependancies
const Web3 = require("web3");
const Tx = require("ethereumjs-tx").Transaction;
require ('dotenv').config();

// Get values from .env file
const infuraToken = process.env.INFURA_TOKEN;
const contractAddress = process.env.CONTRACT_ADDRESS;
const ownerAddress = process.env.OWNER_ADDRESS;
const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'hex');

// Assign power value to show amounts correctly in console
const power = Math.pow(10, 18); // 10^18

// Check if values from .env are correct
// console.log(`
//     Infura token = ${infuraToken}
//     Contract address: ${contractAddress}
//     Owner address: ${ownerAddress}
//     Private key: ${privateKey.toString('hex')}
// `);

// Assign RPC URL with infuraToken
const rpc_url = "https://ropsten.infura.io/v3/" + infuraToken;

// Connect to web3 via Infura
const web3 = new Web3(rpc_url);

// Print to console
console.log(`Connected to web3`);

// Load ABI from contract
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]

// Create contract instance object
// // It must obey the ABI
// // It is at the address of the contract
const contract = new web3.eth.Contract(abi, contractAddress);

// Print to console
console.log(`Conntected to contract through web3`);

// Method to get name of token
const getName = async() => {

    // Call contract to get name
    let name = await contract.methods.name().call();

    // Print name to console
    console.log(`Name: ${name}`);

    return name;

}

// Method to get symbol of token
const getSymbol = async() => {

    // Call contract to get symbol
    let symbol = await contract.methods.symbol().call();

    // Print symbol to console
    console.log(`Symbol: ${symbol}`);

    return symbol;

}

// Method to get the amount numbers after the decimal place
const getDecimals = async() => {

    // Call contract to get decimal places
    let decimals = await contract.methods.decimals().call();

    // Print decimal amount to console
    console.log(`Decimals: ${decimals}`);

    return decimals;

}

// Method to get the total supply amount
const getTotalSupply = async() => {

    // Call contract to get total supply amount
    let totalSupply = await contract.methods.totalSupply().call();

    // Print total supply amount to console
    console.log(`Total Supply: ${totalSupply / power}`);

    return totalSupply;

}

// Method to get balance
const getBalance = async(fromAddress) => {

    // Call contract with from address to get balance
    let balance = await contract.methods.balanceOf(fromAddress).call();

    // Print balance to console
    console.log(`Balance of address ${fromAddress}: ${balance / power}`);

    return balance;
}

// Method to transfer tokens with from and to address, and amount
const transferTokens = async(fromAddress, toAddress, amount) => {

    // Eth tx:
    // Need private key to sign
    // Need nonce (counter) to avoud tx replays

    // Set nonce - local - may return
    const nonce = await web3.eth.getTransactionCount(fromAddress);

    // Print nonce for from address
    console.log(`Nonce ${nonce} for addresss ${fromAddress}`);

    // Create tx object
    const txObject = {
        nonce: web3.utils.toHex(nonce),
        gasLimit: web3.utils.toHex(500000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
        to: contractAddress,
        data: contract.methods.transfer(toAddress, amount).encodeABI()
    }

    // Create tx object
    const tx = new Tx(txObject, {chain: 'ropsten', hardfork: 'petersburg'});

    // Sign transaction with private key
    tx.sign(privateKey);

    // Serialise tx
    const serialisedTx = tx.serialize();

    // Convert serisalised tx to hex
    const raw = `0x${serialisedTx.toString('hex')}`;

    // Print to console
    console.log(`Sending transaction. Please wait...`);

    // Set tx response
    let txResponse = await web3.eth.sendSignedTransaction(raw);
    
    // Print confirmation to console
    console.log(`Transaction sent!\nCompleted in block number ${txResponse.blockNumber}\nTransaction hash address: ${txResponse.transactionHash}\n`);

}

// Test to see if methods are working
// const getAllInfo = async => {
    
//     // Call methods
//     getName();
//     getSymbol();
//     getDecimals();
//     getTotalSupply();
//     getBalance(ownerAddress);
//     transferTokens(ownerAddress,"0x03ce686C4491CA66d4afC9c234EcA66136bE710e", 1);
// }

// // Call getAllInfo
// getAllInfo();

// Export methods to use in distributeFivePercent.js
module.exports = {
    getName,
    getSymbol,
    getDecimals,
    getTotalSupply,
    getBalance,
    transferTokens
};
