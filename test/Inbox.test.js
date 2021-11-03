// we need to be aware that we are dealing with money, so testing is important (with mocha)
// we are going to deploy our contract to a local test network (TestRPC/Ganache)

const assert = require("assert"); // part of node
const ganache = require("ganache-cli");
const Web3 = require("web3"); // constructor function (Obj)
const { interface, bytecode } = require("../compile");

// instance of Web3; Provider as communication layer between Web3 library and a Ethereum Network (e.g. Ganache)
// send and receive messages between Web3 and Ganache
const web3 = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async () => {
  // get a list of all unlocked accounts from ganache
  accounts = await web3.eth.getAccounts();

  // use one of those accounts to deploy the contract (with web3 library)
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi there!"],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address); // check if address exists - will fail with null or undefined
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, "Hi there!");
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("bye").send({ from: accounts[0] }); // send trx, who is paying the gas
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, "bye");
  });
});
