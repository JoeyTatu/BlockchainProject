// What this file does
// // Read .env file
// // Read and access erc20_contract.js file
// // Count the number of account addresses
// // Retreive the remaining supply owned by the owner address
// // Get 5% of remaining supply
// // Calculate share of 5% for each account
// // Loop through accounts to send share amount of 5%
// // Once all this is done, I can relax and have a cookie.

// Import dependancies
// // fs is used to read the addresses.txt file
let fs = require("fs");
// // Call contract
let contract = require("./erc20_contract.js");
// // Use big-number to show full large numbers and not have them shortened as e+ numbers
let BigNumber = require("big-number");
// // Use dotenv to read .env file
require('dotenv').config();


// Get owner address
const ownerAddress = process.env.OWNER_ADDRESS;

// Assign power value to show amounts correctly in console
const power = Math.pow(10, 18); // 10^18

// Method to distribute
const distribute = async() => {
    
    // Get account addresses from accounts.txt
    let distAddresses = fs.readFileSync("./accounts.txt", "utf8").split(",");

    // Print the number of distribution addresses
    console.log(`There are ${distAddresses.length} distribution addresses`);

    // Assign and run getSymbol() from erc20_contract.js
    let symbol = await contract.getSymbol();
    // Print symbol
    // console.log(`Token: ${symbol}`); // Prints in getSymbol()

    // Assign and run getBalance() from erc20_contract.js
    let remainingSupply = await contract.getBalance(ownerAddress);
    // Currently remainingSupply prints out "1.000001e+30".
    //console.log(remainingSupply);
    // Using big-number to convert "1.000001e+30" to "1000000999999999999999999999998"
    let ownerBal = new BigNumber(remainingSupply);

    // Get 5% of ownerBal
    let fivePC = ownerBal.div(20);
    // Print 5% of ownerBal, using power to show correctly
    console.log(`5% of reamining supply: ${fivePC / power} ${symbol}\n`);

    // Assign number of addresses
    let noOfAddresses = distAddresses.length;
    // Share 5% equally between addresses
    let distAmount = fivePC.div(noOfAddresses);

    // Loop through each address and send distAmount
    for (i = 0; i < noOfAddresses; i++) {
    
        // Print dist details to console
        console.log(`Distributing ${distAmount / power} ${symbol} to ${distAddresses[i]}`);

        // Transfer tokens
        let returnVal = await contract.transferTokens(ownerAddress, distAddresses[i], distAmount);
    }
    
    // Print tx complete to console
    console.log(`Transactions complete.`)

}

distribute();

