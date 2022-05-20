const hre = require("hardhat");

async function main() {
 
  const Tokyo = await hre.ethers.getContractFactory("Tokyo");
  const token = await Tokyo.deploy();

  await token.deployed();

  console.log("My Tokyo contract deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});