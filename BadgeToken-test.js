const { expect } = require("chai");
const { ethers } = require("hardhat");
const tokenABI = require("../artifacts/contracts/BadgeToken.sol/BadgeToken.json");

describe("BadgeToken contract", function () {
  let BadgeToken, owner, tokenInstance, account1, addr1, addr2;
  let tokenAddress = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';

  beforeEach(async function () {
   [owner, _name, _symbol, account1, addr1, addr2] = await ethers.getSigners();
   tokenInstance = new ethers.Contract(tokenAddress, tokenABI.abi , owner)
   BadgeToken = await ethers.getContractFactory("BadgeToken");
  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {

    it("Should have the correct name and symbol ", async function () {
      expect(await tokenInstance.name()).to.equal('BadgeToken');
      expect(await tokenInstance.symbol()).to.equal('Badge');
    });

    it("Should mint a token with token ID 1 & 2 to account1", async function () {
      const addr1=account1.address;
      await tokenInstance.mintTo(addr1);
      expect(await tokenInstance.ownerOf(1)).to.equal(addr1);

      await tokenInstance.mintTo(addr1);
      expect(await tokenInstance.ownerOf(2)).to.equal(addr1);

      expect(await tokenInstance.balanceOf(addr1)).to.equal(2);      
    });

    it("Should transfer tokens between accounts", async function () {
        const ownerBalance = await tokenInstance.balanceOf(owner.address);
        console.log(balanceOf(owner.address));

      await tokenInstance.transfer(addr1.address, 3);
      const addr1Balance = await tokenInstance.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(3);


      await tokenInstance.connect(addr1).transfer(addr2.address, 4);
      const addr2Balance = await tokenInstance.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(4);
    });

    it("Should fail if sender doesnt have enough tokens", async function () {
      const initialOwnerBalance = await tokenInstance.balanceOf(owner.address);

      await expect(
        tokenInstance.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

      expect(await tokenInstance.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    

    });
});