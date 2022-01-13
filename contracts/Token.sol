//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
    string public name = "Ivan Klak Token";
    string public symbol = "KLAK";
    uint public totalSupply = 1000000000;
    mapping(address => uint) balances; // const balances = { address: uint }

    constructor() {
        // set the balance of the person that deployed this contract to be equal to the total supply
        // msg.sender - smth that automatically going to be available in the context of this contract
        // msg.sender - in this case its the address of the person who deployed the contract
        balances[msg.sender] = totalSupply;
    }

    function transfer(address to, uint amount) external {
        // require the balance of the person, who sending those tokens, its greater or equal to the amount
        // dont allow them if he doesnt have enough
        require(balances[msg.sender] >= amount, "Not enough tokens"); // working like the check
        //we want to subtract the balance of the sender
        balances[msg.sender] -= amount;
        // we want to transfer that value to the another person
        balances[to] += amount;
    }

    //show the balance of account
    function balanceOf(address account) external view returns (uint) {
        return balances[account];
    }
}