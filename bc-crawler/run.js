require('dotenv').config({ path: "../.env" });
const { eth } = require('web3')

const networkId = process.env.NETWORK_ID;
const paymentAddress = require('../build/contracts/Payment.json').networks[networkId].address;

var currentBlock = eth.blockNumber;
const getTxsWithFilter = (filter) => {

}