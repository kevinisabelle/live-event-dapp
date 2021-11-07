import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { LiveEventFactory } from "../../types/LiveEventFactory";
import { LiveEventFactory__factory } from "../../types/factories/LiveEventFactory__factory";

task("deploy:LiveEventFactory").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  console.log("Deploying LiveEventFactory");
  const eventsFactoryFactory: LiveEventFactory__factory = <LiveEventFactory__factory>(
    await ethers.getContractFactory("LiveEventFactory")
  );
  const eventsFactory: LiveEventFactory = <LiveEventFactory>await eventsFactoryFactory.deploy();
  await eventsFactory.deployed();
  console.log("Live events deployed to: ", eventsFactory.address);
});
