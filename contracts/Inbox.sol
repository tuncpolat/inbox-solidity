pragma solidity ^0.4.17; // specify solidity version

// define new contract - we are going to deploy this contract on the ethereum network
contract Inbox {
    string public message;
    
    constructor(string initialMessage) public {
        message = initialMessage;
    } 
    
    function setMessage(string newMessage) public {
        message = newMessage;
    }    
}