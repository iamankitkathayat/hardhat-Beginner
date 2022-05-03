const hre = require("hardhat");

async function main() {
 
  const FirstERC721contract = await hre.ethers.getContractFactory("FirstERC721token");
  const firstERC721contract = await FirstERC721contract.deploy();

  await firstERC721contract.deployed();

  console.log("My FirstERC721 contract deployed to:", firstERC721contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
