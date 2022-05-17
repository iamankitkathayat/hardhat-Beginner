const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DutchAuction Testcases : ", function () {

let auctionContract;
let nftContract;

before(async () => {
[user_1, user_2, user_3] = await ethers.getSigners();
console.log(`Deploying contract with the account: ${user_1.address}`);
});

// ------------------------------- Deploying Contracts -----------------------------------------

it("Should deploy NFT contract", async function () {
const Tokyo = await ethers.getContractFactory("Tokyo");
nftContract = await Tokyo.deploy();
await nftContract.deployed();
console.log("Tokyo contract deployed at : ", nftContract.address);
});


it("Should mint token id 7", async function () {
let oldBalance = await nftContract.balanceOf(user_1.address);
await nftContract.mint(user_1.address, 7);
let newBalance = await nftContract.balanceOf(user_1.address);
expect(Number(oldBalance)).to.lessThan(Number(newBalance));
});


it("Should deploy Auction contract", async function () {
const DutchAuction = await ethers.getContractFactory("DutchAuction");
auctionContract = await DutchAuction.deploy("1000000", 1, nftContract.address, 7);
await auctionContract.deployed();
console.log("DutchAuctionToken contract deployed at : ", auctionContract.address);
});

it("Should call getPrice function", async function () {
  
  const price = await auctionContract.getPrice();
  console.log(price);
  expect(price).to.equal(1000000);
  // let newBalance = await nftContract.balanceOf(user_2.address);
  // expect(Number(oldBalance)).to.lessThan(Number(newBalance));
  });


it("Should buy nft token 7", async function () {
await nftContract.approve(auctionContract.address,7);
// let price = await auctionContract.getPrice();
let oldBalance = await nftContract.balanceOf(user_2.address);
await auctionContract.connect(user_2).buy({ value : "1000000000000000000" });
let newBalance = await nftContract.balanceOf(user_2.address);
expect(Number(oldBalance)).to.lessThan(Number(newBalance));
});

});