const { expect } = require("chai");
const { ethers } = require("hardhat");
const FirstERC20tokenabi= require("../artifacts/contracts/FirstERC20token.sol/FirstERC20token.json");

describe("FirstERC20token.sol: Tests", () => {
    let owner, FirstERC20token, firstERC20token , addr1, addr2;
    

    beforeEach(async () => {
        
        [owner, addr1, addr2, _] = await ethers.getSigners();
       
        //firstERC20token = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", FirstERC20tokenabi.abi, owner);
        const ERC20token = await ethers.getContractFactory('FirstERC20token');
        firstERC20token = ERC20token.attach('0x5FbDB2315678afecb367f032d93F642f64180aa3');
    });

    describe("Deployment", () => {
        it("Should set the contract's address as owner", async () => {
           //expect(await firstERC20token.owner()).to.equal(owner.address);
           console.log(owner.address);
           console.log(await firstERC20token.balanceOf(owner.address));
        });

        it("Should assign the totalSupply of FirstERC20token to the owner", async () => {
            const ownerBalance = await firstERC20token.balanceOf(owner.address);
            expect(await firstERC20token.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transactions", () => {

        it("should transfer tokens between accounts", async () => {
        await firstERC20token.transfer(addr1.address, 50);
        const addr1Balance = await firstERC20token.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(50);

        await firstERC20token.connect(addr1).transfer(addr2.address, 50);
        const addr2Balance = await firstERC20token.balanceOf(addr2.address);
        expect (addr2Balance).to.equal(50);
        });
        

        it("Should fail if sender doesn't have enough tokens", async () => {
            const initalBalanceOwner = await firstERC20token.balanceOf(owner.address);

            await expect(
                firstERC20token
                    .connect(addr1)
                    .transfer(owner.address, 1)
                    )
                    .to
                    .be
                    .revertedWith("Not enough tokens");
            expect(
                await firstERC20token.balanceOf(owner.address)
                )
                .to
                .equal(initalOwnerBalance);
        });


        it("Should update balances after transfers", async () => {
            const initialOwnerBalance = await token.balanceOf(owner.address);

            await firstERC20token.transfer(addr1.address, 100);
            await firstERC20token.transfer(addr2.address, 50);

            const finalOwnerBalance = await firstERC20token.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(intitalOwnerBalance - 150);
            
            const addr1Balance = await firstERC20token.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(100);
            
            const addr2Balance = await firstERC20token.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);

            
        });
    });

}); 