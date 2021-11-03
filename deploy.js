const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3"); // constructor function (Obj)
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "code able walk spot cabbage decline neck kick runway glance twice elevator", // Account Mnemonic - just test account..steal it if you want
  "https://rinkeby.infura.io/v3/a3ceaefe47824e2bafc87050bad13286"
);

// connection between Web3 and rinkeby test network
const web3 = new Web3(provider);

const deploy = async () => {
  // get a list of all accounts from rinkeby - created with Mnemonic
  const accounts = await web3.eth.getAccounts();
  console.log("Attempt to deploy from account", accounts[0]);
  // use one of those accounts to deploy the contract (with web3 library)

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["First Contract in Rinkeby Test Network"],
    })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};

deploy();
