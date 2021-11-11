import React from "react";
import LiveEvents from "./LiveEvents";

const LiveEventsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/liveEvents/:eventOwner?/:eventAddress?",
      component: React.lazy(() => import("./LiveEvents")),
    },
  ],
};

export default LiveEventsConfig;
