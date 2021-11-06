import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

export const getLiveEvents = createAsyncThunk(
  "mailApp/liveevents/getLiveEvents",
  async (routeParams, { dispatch }) => {
    var liveevents = [{ id: 1, name: "test event" }];

    return { liveevents, routeParams, currentLiveEvent };
  }
);

const liveeventsAdapter = createEntityAdapter({});

export const { selectAll: selectLiveEvents, selectById: selectLiveEventById } =
  liveeventsAdapter.getSelectors((state) => state.mailApp.liveevents);

const liveEventsSplice = createSlice({
  name: "liveevents",
  initialState: liveeventsAdapter.getInitialState({
    routeParams: {},
    liveevents: [],
    currentLiveEvent: null,
  }),
  reducers: {
    setSelectedLiveEventByIndex: (state, action) => {
      state.currentLiveEvent = state.liveevents[action.payload];
    },
  },
  extraReducers: {
    [getLiveEvents.fulfilled]: (state, action) => {
      const { liveevents, routeParams, currentLiveEvent } = action.payload;
      const { data } = liveevents;

      const liveeventsWithIndex = data.liveevents.map((liveevent, index) => ({
        ...liveevent,
        index: index,
      }));

      liveeventsAdapter.setAll(state, liveeventsWithIndex);
      state.currentLiveEvent = currentLiveEvent;
      state.routeParams = routeParams;
    },
  },
});

export const { setSelectedLiveEventByIndex } = liveEventsSplice.actions;

export default liveEventsSplice.reducer;
