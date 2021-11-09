// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
// import "hardhat/console.sol";
import "./LiveEventTicket.sol";

contract LiveEventFactory {
    mapping(address => LiveEventTicket[]) public liveEvents;

    struct EventWithNameAndOwner  {
        address Owner ;
        address EventAddress;
        string EventName;
    }

    EventWithNameAndOwner[] public eventsList;
    
    constructor() {}

    function createLiveEvent(
        string memory name,
        string memory location,
        uint256[] memory prices,
        string[] memory categories,
        uint256[] memory seatCounts,
        bool[] memory canBeResoldHigher
    ) public {
        LiveEventTicket newEvent = new LiveEventTicket(
            name,
            location,
            prices,
            categories,
            seatCounts,
            canBeResoldHigher
        );

        newEvent.transferOwnership(msg.sender);
        liveEvents[msg.sender].push(newEvent);

        EventWithNameAndOwner memory eventDetails;
        eventDetails.EventName = name;
        eventDetails.Owner = msg.sender;
        eventDetails.EventAddress = address(newEvent);

        eventsList.push(eventDetails);
    }

    /*function getEvents() public view returns (LiveEventTicket[][]) {
        address[][] memory ret = new address[][](liveEvents.length);
        for (uint i=0; i < liveEvents.length; i++){
            ret[i] = liveEvents[owner];
        }
        return ret;
    }*/

    function getEvent(address owner, uint256 index) public view returns (LiveEventTicket) {
        return LiveEventTicket(address(liveEvents[owner][index]));
    }
}
