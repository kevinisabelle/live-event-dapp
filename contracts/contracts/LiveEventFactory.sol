// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./LiveEventTicket.sol";

contract LiveEventFactory {
    LiveEventTicket[] public liveEvents;
    address[] public eventsOwners;

    event NewEventCreated(address owner, address eventAddress, string eventName, string eventLocation);

    constructor() {}

    function createLiveEvent(
        string memory name,
        string memory location,
        string memory metadata,
        uint256[] memory prices,
        string[] memory categories,
        uint256[] memory seatCounts,
        bool[] memory canBeResoldHigher
    ) external {
        
        LiveEventTicket newEvent = new LiveEventTicket(
            name,
            location,
            metadata,
            prices,
            categories,
            seatCounts,
            canBeResoldHigher
        );

        newEvent.transferOwnership(msg.sender);
        liveEvents.push(newEvent);

        bool addOwner = true;

        for (uint256 i=0;i<eventsOwners.length;i++)
        {
            if (address(eventsOwners[i]) == address(msg.sender)){
                addOwner = false;
                break;
            }
        }

        if (addOwner) {
            eventsOwners.push(address(msg.sender));
        }
    
        emit NewEventCreated(address(msg.sender), address(newEvent), name, location);
    }

    function getEvents(address owner) public view returns (address[] memory) {

        uint256 foundCount = 0;

        for (uint i = 0; i<liveEvents.length;i++)
        {
            LiveEventTicket currentEvent = LiveEventTicket(liveEvents[i]);
            if (currentEvent.owner() == owner){
                foundCount++;
            }
        }

        address[] memory returnvalue = new address[](foundCount);
        uint256 position = 0;

        for (uint i = 0; i<liveEvents.length;i++)
        {
            LiveEventTicket currentEvent = LiveEventTicket(liveEvents[i]);
            if (currentEvent.owner() == owner){
                returnvalue[position] = address(liveEvents[i]);
                position++;
            }
        }
        
        return returnvalue;
    }

    function getOwners() public view returns (address[] memory) {
        return eventsOwners;
    }
}