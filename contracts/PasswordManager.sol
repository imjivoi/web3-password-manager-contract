// SPDX-License-Identifier: MIT


pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract PasswordManager is Ownable {
    using Strings for uint256;

    struct Account {
        string siteName;
        string login;
        string password;
        uint256 id;
    }

    mapping(address => Account[] ) private accounts;

    modifier callerIsUser() {
        require(tx.origin == msg.sender, "[Error] Function cannot be called by a contract");
        _;
    }

    function checkValues(
        string calldata siteName, 
        string calldata login, 
        string calldata password
    ) internal pure {
        unchecked {
            require(bytes(siteName).length > 0, "[Error] Site name can't Be Blank");
            require(bytes(login).length > 0, "[Error]  Login can't Be Blank");
            require(bytes(password).length > 0, "[Error]  Password can't Be Blank");
        }
    }

    function generateID() internal view returns(uint256) {
        unchecked {
            return accounts[msg.sender].length + 1;
        }
    }

    function addNewAccount(
        string calldata siteName, 
        string calldata login, 
        string calldata password
    ) public callerIsUser() onlyOwner {
        checkValues(siteName, login, password);
        accounts[msg.sender].push(Account(siteName, login, password, generateID()));
    }

    function updateAccount(
        uint256 recordID, 
        string calldata siteName, 
        string calldata login, 
        string calldata password
    ) public callerIsUser() onlyOwner returns (bool) {
        checkValues(siteName, login, password);
        Account[] storage currentAccounts = accounts[msg.sender];

        for(uint i = 0; i < currentAccounts.length; i++) {
            if(currentAccounts[i].id == recordID) {
                currentAccounts[i] = Account(siteName, login, password, recordID);
            }
        }
        return true;
    } 

    function deleteAccount(
        uint256 recordID
    ) public callerIsUser() onlyOwner returns (bool) {
        Account[] storage currentAccounts = accounts[msg.sender];
        for(uint i = 0; i < currentAccounts.length; i++) {
            if(currentAccounts[i].id == recordID) {
                // delete currentAccounts[i];
                for (uint j = i; j < currentAccounts.length - 1; j++) {
                  currentAccounts[j] = currentAccounts[j+1];
                }
                currentAccounts.pop();
            }
        }
        return true;
    } 

    function getAccountByID(
        uint256 recordID
    ) public view callerIsUser() onlyOwner returns (Account memory) {
        Account[] storage currentAccounts = accounts[msg.sender];
        
        for(uint i = 0; i < currentAccounts.length; i++) {
            if(currentAccounts[i].id == recordID) {
                return currentAccounts[i];
            }
        }
    }
 
    function allAccounts() public view callerIsUser() returns (Account[] memory) {
        return accounts[msg.sender];
    } 
}