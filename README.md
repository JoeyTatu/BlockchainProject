Been working on Blockchain Labs before creating this repo. Just in case one thought I hadn't done anything beforehand.

The Blockchain Labs repo can be found here: [github.com/JoeyTatu/BlockchainLabs](https://github.com/JoeyTatu/BlockchainLabs)


## NOTES: ##
- .env is included with Video presentation link.
- This file explains the processes from start to finish according to the project requirements.


## 1. Create an Ethereum account ##

One can create an Ethereum account through MetaMask or other wallet.

Fist we need to install the required packages:
    ``` npm install ```

Create a .env file in the main folder and add:
    ```PASSPHRASE = "{Insert passphrase here}"```

Ensure the .env file is saved before continuing.

Run: ``` node .\crypto\wallet.js ```



## 2. Create an ERC20-compliant, fixed-supply token ##

MetaMask should be installed and set up in the browser.

Copy the contents from 
``` conctacts/openzep_contract.sol ```.

On https://remix.ethereum.org/, create a new contracts file.
Compile and deploy the token. 

It's also good practise to verify and publish the token on Etherscan.



## 3. Deploy the token contract to the Ethereum Test Net network. ##

In the .env file, assign:
- INFURA_TOKEN,
- CONTRACT_ADDRESS,
- OWNER_ADDRESS,
- PRIVATE_KEY.

If you wish to run this file on its own, please uncomment lines 165 to 177 in contract.js, save file and then run
```$ node .\erc20_contract.js ```

Re-comment lines 165 to 177 and save file to continue.



## 4. Build a Node.js application. 

## ## Run file on its own: 
```$ npm .\distributeFivePercent.js ```

## ## Run Docker:
Ensure Docker Desktop is running (or Docker Daemon).

## ## ## Ensure there's no Docker files in memory, run:
```$ docker system prune -a -f ```

## ## ## Build Docker container:
```$ docker build -t project . ```
(Don't forget the full stop)

## ## ## Run Docker container via command:
``` $ docker run -d -p 80:80 --name project project ```
(Output via Logs in Docker Desktop. Remove -d to see output in console as well.)
(Note: There are many tags that can be changed here, e.g. remove "-d -p 80:80". If no name is entered, a name is generated, etc. This is just what I used.)

## ## ## Run Docker via docker-compose.yaml:
``` $ docker-compose up --build -d ```

## ## ## Docker Hub:
- - Upload:
```$ docker image tag project joeytatu/project:latest ```
```$ docker image push joeytatu/project:latest ```

- - Get:
``` $docker pull joeytatu/project:latest ```

