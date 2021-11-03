const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");

// compile statement
// Inbox Object returned from compile - includes bytecode & ABI (interface - needed to access the bytecode through Web3)
module.exports = solc.compile(source, 1).contracts[":Inbox"];
