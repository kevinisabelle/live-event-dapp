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
      path: "/liveEvents/:eventId?",
      component: React.lazy(() => import("./LiveEvents")),
    },
  ],
};

export default LiveEventsConfig;
