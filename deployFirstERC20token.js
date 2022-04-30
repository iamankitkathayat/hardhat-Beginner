const hre = require("hardhat");

async function main() {
  const FirstERC20token = await hre.ethers.getContractFactory("FirstERC20token");
  const firstERC20token = await FirstERC20token.deploy();

  await firstERC20token.deployed();
  
  console.log("FirstERC20 token deployed to", firstERC20token.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
