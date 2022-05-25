const Payment = artifacts.require("Payment");
const TestERC20 = artifacts.require("TestERC20");
require('dotenv').config({ path: "../.env" });

const treasuryAddr = process.env.TREASURY_ADDR
const payAmount = process.env.PAY_AMOUNT

module.exports = async(deployer) => {
  await deployer.deploy(TestERC20, "Test", "T", treasuryAddr);
  const tokenData = await TestERC20.deployed();
  await deployer.deploy(Payment, treasuryAddr, tokenData.address, payAmount);
  // const paymentData = await Payment.deployed();
  // return paymentData.address;
};
