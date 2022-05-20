const hre = require("hardhat");

async function main() {

  const DutchAuction = await hre.ethers.getContractFactory("DutchAuction");
  console.log('Deploying Dutch Auction contract :  ');
  const DAuction = await DutchAuction.deploy('1000000', '1', '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512' , '1');

  await DAuction.deployed();
  console.log("DAuction deployed to:", DAuction.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });