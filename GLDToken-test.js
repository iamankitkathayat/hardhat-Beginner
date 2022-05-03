const { expect } = require("chai");
const { ethers } = require("hardhat");
const tokenABI = require("../artifacts/contracts/GLDtoken.sol/GLDToken.json");

describe("GLDToken contract", function () {
  let Token, tokenInstance, owner, addr1, addr2, addrs;
  let tokenAddress = '0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44';
  
  
  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  //  console.log("testing the contract with address:  " , owner.address)
   tokenInstance = new ethers.Contract(tokenAddress, tokenABI.abi , owner)
    const Token = await ethers.getContractFactory('GLDToken');
  });



  describe("Deployment", function () {

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await tokenInstance.balanceOf(owner.address);
      expect(await tokenInstance.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {

    it("Should transfer tokens between accounts", async function () {
        const ownerBalance = await tokenInstance.balanceOf(owner.address);
        
      await tokenInstance.transfer(addr1.address, 50);
      const addr1Balance = await tokenInstance.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);


      await tokenInstance.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await tokenInstance.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
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

    describe("Transaction 2", function () {

    it("Should approve the transfer of tokens between accounts", async function () {
      const ownerBalance = await tokenInstance.balanceOf(owner.address);
        expect(await tokenInstance.approve(addr1.address, 15))
   .to.emit(tokenInstance, "Approval")
   .withArgs(owner.address, addr1.address, 15);

    });
    

    it("Should show the allowance of transfer of tokens between accounts", async function() {  
      const ownerBalance = await tokenInstance.balanceOf(owner.address);
      expect(await tokenInstance.approve(addr1.address, 15))
   .to.emit(tokenInstance, "Approval")
   .withArgs(owner.address, addr1.address, 15);

    expect(await tokenInstance.allowance(owner.address, addr1.address)).to.equal(15) 

    });

    it("Should transferFrom of tokens between accounts", async function () {
      const ownerBalance = await tokenInstance.balanceOf(owner.address);
      expect(await tokenInstance.approve(addr1.address, 15))
   .to.emit(tokenInstance, "Approval")
   .withArgs(owner.address, addr1.address, 15);

    expect(await tokenInstance.allowance(owner.address, addr1.address)).to.equal(15)
    expect(await tokenInstance.connect(addr1).transferFrom(owner.address, addr2.address, 15))
   .to.emit(tokenInstance, "Transfer")
   .withArgs(owner.address, addr2.address, 15) ;
    });
  });
});