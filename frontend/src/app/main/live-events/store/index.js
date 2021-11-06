import { combineReducers } from "@reduxjs/toolkit";

import liveEventsSlice from "./liveEventsSlice";

const reducer = combineReducers({
  liveEventsSlice,
});

export default reducer;
