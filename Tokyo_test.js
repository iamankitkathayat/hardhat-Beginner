const { expect } = require("chai");
const { ethers } = require("hardhat");
const tokenABI = require("../artifacts/contracts/Tokyo.sol/Tokyo.json");

describe("TokyoToken contract", function () {
  let TokyoToken, owner, tokenInstance, account1, addr1, addr2;
  let tokenAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

  beforeEach(async function () {
   [owner, _name, _symbol, account1, addr1, addr2] = await ethers.getSigners();
   tokenInstance = new ethers.Contract(tokenAddress, tokenABI.abi , owner)
   TokyoToken = await ethers.getContractFactory("Tokyo");
  });


  describe("Deployment", function () {
    it("NFT is minted successfully", async function() {
        [account1] = await ethers.getSigners();
    
        expect(await tokenInstance.balanceOf(account1.address)).to.equal(0);
        
        const tokenURI = "https://opensea-creatures-api.herokuapp.com/api/creature/1"
        const tx = await tokenInstance.connect(account1).mint(tokenURI);
    
        expect(await tokenInstance.balanceOf(account1.address)).to.equal(1);

        // const address1 = account1.address;
        // await tokenInstance.mintTo(address1);
        // expect(await tokenInstance.ownerOf(1)).to.equal(address1);

        // await tokenInstance.mintTo(address1);
        // expect(await tokenInstance.ownerOf(2)).to.equal(address1);;

        // expect(await tokenInstance.balanceOf(address1)).to.equal(2);
    })

  });
});