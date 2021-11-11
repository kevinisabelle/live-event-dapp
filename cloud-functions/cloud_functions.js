Moralis.Cloud.define("getEventsOwners", async function (request) {
  const query = new Parse.Query("flips");
  query.equalTo("win", false);
  const pipeline = [
    {
      group: {
        objectId: "$user",
        totalLost: { $sum: { $toInt: "$bet" } },
      },
    },
    { sort: { totalLost: -1 } },
  ];

  // the master key is required for aggregate queries
  const pipelineresult = await query.aggregate(pipeline, {
    useMasterKey: true,
  });

  return pipelineresult;
});
