// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
// Returns the balance of the given address in ETH
async function getBalance(address) {
  // console.log(await hre.ethers.provider.getBalance(address));
  const balance = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balance);  
}

async function printBalances(addresses) {
  let i=0;
  for (const address of addresses) {
    console.log(`Balance of ${address}: ${await getBalance(address)}`);
    i++;
  }
  
}

function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAdrress = memo.owner;
    const message = memo.message;
    console.log(`Timestamp: ${timestamp}, Tipper: ${tipper}, Address: ${tipperAdrress}, Message: ${message}`);

    // console.log(memo);
  }
}

async function main() {
  const [owner,addr1] = await hre.ethers.getSigners();

  const BuyMeACoffee= await hre.ethers.getContractFactory("buymeacoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();
  await buyMeACoffee.deployed();
  console.log("BuyMeACoffee deployed to:", buyMeACoffee.address);
  const addresses =[owner.address,addr1.address,buyMeACoffee.address];
  // console.log(getBalance(addresses[0]));
  await printBalances(addresses); 

  const tip = {value:hre.ethers.utils.parseEther("1")};
  await buyMeACoffee.connect(addr1).buycoffee("Jatt","Jatt Life",tip)
  console.log("Bought Coffee");
  await printBalances(addresses);

  await buyMeACoffee.connect(owner).withdrawTips();
  console.log("Withdrawn Tips");
  await printBalances(addresses);

  console.log("==memos==");
  const memos = await buyMeACoffee.getMemos();
  printMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
