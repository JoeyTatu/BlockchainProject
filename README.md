Been working on Blockchain Labs before creating this repo. Just in case one thought I hadn't done anything beforehand.

The Blockchain Labs repo can be found here: [github.com/JoeyTatu/BlockchainLabs](https://github.com/JoeyTatu/BlockchainLabs)



## 1. Create an Ethereum account ##

Fist we need to install the required packages:
    ```npm install```

Create a .env file in the main folder and add:
    ```PASSPHRASE = "{Insert passphrase here}"```

Example for testing:
    ```PASSPHRASE = "pass phrase pass phrase pass phrase pass phrase pass phrase pass phrase pass phrase"```

Ensure the .env file is saved before continuing.

Run: ```node .\crypto\wallet.js```



## 2. Create an ERC20-compliant, fixed-supply token ##

MetaMask should be installed and set up in the browser. 
Copy the contents from ```conctacts/openzep_contract.sol```.

On https://remix.ethereum.org/, create a new contracts file.
Compile and deploy the token. 

It's also good practise to verify and publish the token on Etherscan.



## 3. Deploy the token contract to the Ethereum Test Net network. ##