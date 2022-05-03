const { expect } = require("chai");
const { ethers } = require("hardhat");
const tokenABI = require("../artifacts/contracts/BadgeToken.sol/BadgeToken.json");

describe("BadgeToken contract", function () {
  let BadgeToken, owner, tokenInstance, account1, addr1, addr2;
  let tokenAddress = '0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f';

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

    it("Should transferFrom of tokens between accounts", async function () {
      const ownerBalance = await tokenInstance.balanceOf(owner.address);
      expect(await tokenInstance.approve(addr1.address, 1))
   .to.emit(tokenInstance, "Approval")
   .withArgs(owner.address, addr1.address, 1);

    expect(await tokenInstance.connect(addr1).transferFrom(owner.address, addr1.address, 1))
   .to.emit(tokenInstance, "Transfer")
   .withArgs(owner.address, addr1.address, 1) ;
    });

    // it("Should transfer tokens between accounts", async function () {
    //     const ownerBalance = await tokenInstance.balanceOf(owner.address);
    //     console.log(ownerBalance);

    //   await tokenInstance.transfer(addr1.address, 1);
    //   const addr1Balance = await tokenInstance.balanceOf(addr1.address);
    //   expect(addr1Balance).to.equal(1);


    //   await tokenInstance.connect(addr1).transfer(addr2.address, 2);
    //   const addr2Balance = await tokenInstance.balanceOf(addr2.address);
    //      expect(addr2Balance).to.equal(2);
    // });

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
