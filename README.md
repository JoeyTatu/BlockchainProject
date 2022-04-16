Been working on Blockchain Labs before creating this repo. Just in case one thought I hadn't done anything beforehand.

The Blockchain Labs repo can be found here: [github.com/JoeyTatu/BlockchainLabs](https://github.com/JoeyTatu/BlockchainLabs)

# Prerequisites
- Note: These instructions are for a Windows 11 OS with a Google Chrome browser. Other OSes or browsers may be slightly different.
- It is assumed that Visual Studio Code will be used to browse the project files.
- MetaMask should be installed on your browser
- Following the instructions on MetaMask, you should create a new account.
- Funds should be added using the Ropsten Test Network. 3 ETH should be more than enough.
- You can add funds by searching online for "Ethereum Ropsten add funds"

# Step 1 - Creating the Token 
a. Create a new file in the contracts folder on https://remix.ethereum.org/.

b. Copy and paste the contents of openzep_contract.sol this new file. Ensure that it is saved by selecting CTRL + S. 

c. On the tabs on the left of the page, click on the up and down arrows. 

d. Select Compile <FILENAME>.sol. 

e. Click on the tab below the arrows. Ensure these settings are correct:
- Environment: Injected Web3
- Account: <Your Eth address>
- Gas limit: 3000000 (3,000,000)
- Value 0 Wei
- Contact: ERC20 - contracts/<FILENAME>.sol