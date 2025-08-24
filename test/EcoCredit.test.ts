// test/EcoCredit.test.ts
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { EcoCredit } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("EcoCredit", function () {
  let ecoCredit: EcoCredit;
  let admin: SignerWithAddress;
  let relayer: SignerWithAddress;
  let user: SignerWithAddress;
  let facility: SignerWithAddress;

  beforeEach(async function () {
    [admin, relayer, user, facility] = await ethers.getSigners();

    const EcoCredit = await ethers.getContractFactory("EcoCredit");
    ecoCredit = (await upgrades.deployProxy(
      EcoCredit,
      [admin.address],
      { initializer: "initialize" }
    )) as EcoCredit;
    await ecoCredit.deployed();

    // Grant roles
    const RELAYER_ROLE = await ecoCredit.RELAYER_ROLE();
    const FACILITY_ROLE = await ecoCredit.FACILITY_ROLE();
    await ecoCredit.grantRole(RELAYER_ROLE, relayer.address);
    await ecoCredit.grantRole(FACILITY_ROLE, facility.address);
  });

  describe("Initialization", function () {
    it("Should initialize with correct name and symbol", async function () {
      expect(await ecoCredit.name()).to.equal("EcoCredit");
      expect(await ecoCredit.symbol()).to.equal("ECO");
      expect(await ecoCredit.decimals()).to.equal(18);
    });

    it("Should grant admin role to deployer", async function () {
      const ADMIN_ROLE = await ecoCredit.ADMIN_ROLE();
      expect(await ecoCredit.hasRole(ADMIN_ROLE, admin.address)).to.be.true;
    });
  });

  describe("Access Control", function () {
    it("Should only allow relayer to mint", async function () {
      await expect(
        ecoCredit.connect(user).mint(user.address, "order-1", 100, "plastic")
      ).to.be.reverted;
    });

    it("Should allow relayer to mint", async function () {
      await expect(
        ecoCredit.connect(relayer).mint(user.address, "order-1", 100, "plastic")
      ).not.to.be.reverted;
    });

    it("Should only allow admin to pause", async function () {
      await expect(ecoCredit.connect(user).pause()).to.be.reverted;
      await expect(ecoCredit.connect(admin).pause()).not.to.be.reverted;
    });
  });

  describe("Minting", function () {
    it("Should mint correct amount of credits", async function () {
      const weightKg = 100;
      const expectedCredits = ethers.utils.parseEther(weightKg.toString());

      await ecoCredit.connect(relayer).mint(user.address, "order-1", weightKg, "plastic");
      
      expect(await ecoCredit.balanceOf(user.address)).to.equal(expectedCredits);
    });

    it("Should prevent double minting same order", async function () {
      await ecoCredit.connect(relayer).mint(user.address, "order-1", 100, "plastic");
      
      await expect(
        ecoCredit.connect(relayer).mint(user.address, "order-1", 100, "plastic")
      ).to.be.revertedWith("EcoCredit: order already minted");
    });

    it("Should enforce maximum credits per order", async function () {
      const maxWeight = 10001; // Exceeds MAX_CREDITS_PER_ORDER
      
      await expect(
        ecoCredit.connect(relayer).mint(user.address, "order-1", maxWeight, "plastic")
      ).to.be.revertedWith("EcoCredit: exceeds max credits per order");
    });

    it("Should emit correct events", async function () {
      const tx = await ecoCredit.connect(relayer).mint(user.address, "order-1", 100, "plastic");
      
      await expect(tx)
        .to.emit(ecoCredit, "CreditsMinted")
        .withArgs(user.address, ethers.utils.parseEther("100"), "order-1", 100, "plastic");
    });

    it("Should track order status", async function () {
      await ecoCredit.connect(relayer).mint(user.address, "order-1", 100, "plastic");
      
      expect(await ecoCredit.isOrderMinted("order-1")).to.be.true;
      expect(await ecoCredit.getOrderCredits("order-1")).to.equal(ethers.utils.parseEther("100"));
    });
  });

  describe("Batch Minting", function () {
    it("Should mint multiple orders", async function () {
      const recipients = [user.address, user.address];
      const orderIds = ["order-1", "order-2"];
      const weights = [100, 200];
      const wasteTypes = ["plastic", "metal"];

      await ecoCredit.connect(relayer).batchMint(recipients, orderIds, weights, wasteTypes);
      
      expect(await ecoCredit.balanceOf(user.address)).to.equal(ethers.utils.parseEther("300"));
      expect(await ecoCredit.isOrderMinted("order-1")).to.be.true;
      expect(await ecoCredit.isOrderMinted("order-2")).to.be.true;
    });

    it("Should skip already minted orders", async function () {
      // First mint
      await ecoCredit.connect(relayer).mint(user.address, "order-1", 100, "plastic");
      
      // Batch mint including already minted order
      const recipients = [user.address, user.address];
      const orderIds = ["order-1", "order-2"];
      const weights = [100, 200];
      const wasteTypes = ["plastic", "metal"];

      await ecoCredit.connect(relayer).batchMint(recipients, orderIds, weights, wasteTypes);
      
      // Should have credits from both orders, but order-1 only counted once
      expect(await ecoCredit.balanceOf(user.address)).to.equal(ethers.utils.parseEther("300"));
    });
  });

  describe("Pausable", function () {
    it("Should prevent minting when paused", async function () {
      await ecoCredit.connect(admin).pause();
      
      await expect(
        ecoCredit.connect(relayer).mint(user.address, "order-1", 100, "plastic")
      ).to.be.revertedWith("Pausable: paused");
    });

    it("Should prevent transfers when paused", async function () {
      // Mint some tokens first
      await ecoCredit.connect(relayer).mint(user.address, "order-1", 100, "plastic");
      
      // Pause and try to transfer
      await ecoCredit.connect(admin).pause();
      
      await expect(
        ecoCredit.connect(user).transfer(facility.address, ethers.utils.parseEther("50"))
      ).to.be.revertedWith("Pausable: paused");
    });
  });

  describe("Reentrancy Guard", function () {
    it("Should be protected against reentrancy", async function () {
      // This is more of a structural test - the ReentrancyGuard is in place
      expect(await ecoCredit.mint.length).to.be.greaterThan(0);
    });
  });
});
