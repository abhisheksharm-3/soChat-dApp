//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract ChatApp {
    //User Struct
    struct user {
        string name;
        friend[] friendList;
    }
    struct friend {
        address pubkey;
        string name;
    }
    struct message {
        address sender;
        uint256 timestamp;
        string msg;
    }
    struct AllUserStruct {
        string name;
        address accountAddress;
    }

    AllUserStruct[] getAllUsers;

    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;

    //Check User Exist
    function checkUserExist(address pubKey) public view returns (bool) {
        return bytes(userList[pubKey].name).length > 0;
    }

    //Create Account
    function createAccout(string calldata name) external {
        require(checkUserExist(msg.sender) == false, "User Already Exists");
        require(bytes(name).length > 0, "Username cannot be empty");
        userList[msg.sender].name = name;

        getAllUsers.push(AllUserStruct(name, msg.sender));
    }

    //Get Username
    function getUsername(address pubkey) external view returns (string memory) {
        require(checkUserExist(pubkey), "User Not Registered");
        return userList[pubkey].name;
    }

    //Add Friends
    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExist(msg.sender), "Create an Account First");
        require(checkUserExist(friend_key), "User is Not Registered");
        require(
            msg.sender != friend_key,
            "USer cannot add themselves as friend"
        );
        require(
            checkAlreadyFriends(msg.sender, friend_key) == false,
            "Already Friends"
        );

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
    }

    function checkAlreadyFriends(
        address pubkey1,
        address pubkey2
    ) internal view returns (bool) {
        if (
            userList[pubkey1].friendList.length >
            userList[pubkey2].friendList.length
        ) {
            address temp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = temp;
        }
        for (uint256 i = 0; i < userList[pubkey1].friendList.length; i++) {
            if (userList[pubkey1].friendList[i].pubkey == pubkey2) return true;
        }
        return false;
    }

    function _addFriend(
        address me,
        address friend_key,
        string memory name
    ) internal {
        friend memory newFriend = friend(friend_key, name);
        userList[me].friendList.push(newFriend);
    }

    function getMyFriendList() external view returns (friend[] memory) {
        return userList[msg.sender].friendList;
    }

    function _getChatCode(
        address pubkey1,
        address pubkey2
    ) internal pure returns (bytes32) {
        if (pubkey1 < pubkey2) {
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        } else return keccak256((abi.encodePacked(pubkey2, pubkey1)));
    }

    function sendMessage(address friend_key, string calldata _msg) external {
        require(checkUserExist(msg.sender), "Create an Account First");
        require(checkUserExist(friend_key), "User Doesn't Exist");
        require(
            checkAlreadyFriends(msg.sender, friend_key),
            "You are not friends with the given user"
        );

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        message memory newMessage = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMessage);
    }

    function readMessage(
        address friend_key
    ) external view returns (message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }

    function getAllAppUsers() public view returns(AllUserStruct[] memory){
        return getAllUsers;
    }
}
