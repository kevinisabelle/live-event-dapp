// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/hardhat/console.sol";
import "./LiveEventTicket.sol";

contract LiveEventFactory {
    LiveEventTicket[] public liveEvents;

    event NewEventCreated(address owner, address eventAddress, string eventName, string eventLocation, PriceStructure eventPriceStructure);

    /*struct EventWithNameAndOwner  {
        address Owner ;
        address EventAddress;
        string EventName;
    }*/

    struct PriceStructure
    {
        uint256[] prices;
        string[] categories;
        uint256[] seatCounts;
        bool[] canBeResoldHigher;
    }

    //EventWithNameAndOwner[] public eventsList;
    
    constructor() {}

    function createLiveEvent(
        string memory name,
        string memory location,
        uint256[] memory prices,
        string[] memory categories,
        uint256[] memory seatCounts,
        bool[] memory canBeResoldHigher
    ) external {
        
        LiveEventTicket newEvent = new LiveEventTicket(
            name,
            location,
            prices,
            categories,
            seatCounts,
            canBeResoldHigher
        );

        newEvent.transferOwnership(msg.sender);
        liveEvents.push(newEvent);

        //EventWithNameAndOwner memory eventDetails;
        //eventDetails.EventName = name;
        //eventDetails.Owner = msg.sender;
        //eventDetails.EventAddress = address(newEvent);

        //eventsList.push(eventDetails);

        PriceStructure memory priceStructure = PriceStructure(prices, categories, seatCounts, canBeResoldHigher);

        emit NewEventCreated(address(msg.sender), address(newEvent), name, location, priceStructure);

        // console.log("Emitted event");
    }

    function getEvent(address owner) public view returns (address[] memory) {

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
}
