const LiveEventFactory = {
  _format: "hh-sol-artifact-1",
  contractName: "LiveEventFactory",
  sourceName: "contracts/LiveEventFactory.sol",
  abi: [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "eventAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          indexed: false,
          internalType: "string",
          name: "location",
          type: "string",
        },
      ],
      name: "NewEventCreated",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "location",
          type: "string",
        },
        {
          internalType: "uint256[]",
          name: "prices",
          type: "uint256[]",
        },
        {
          internalType: "string[]",
          name: "categories",
          type: "string[]",
        },
        {
          internalType: "uint256[]",
          name: "seatCounts",
          type: "uint256[]",
        },
        {
          internalType: "bool[]",
          name: "canBeResoldHigher",
          type: "bool[]",
        },
      ],
      name: "createLiveEvent",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "getEvent",
      outputs: [
        {
          internalType: "contract LiveEventTicket",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "liveEvents",
      outputs: [
        {
          internalType: "contract LiveEventTicket",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
};

export default LiveEventFactory;
