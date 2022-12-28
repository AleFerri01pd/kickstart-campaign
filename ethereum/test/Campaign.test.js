const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //construttore => usato per instanziare ogetti di tipo Web3
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../build/CampaignFactory.json');
const compiledCampaign = require('../build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: '1000000'});
})