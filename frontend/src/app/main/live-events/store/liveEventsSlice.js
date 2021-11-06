import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { GetLiveEventsDocument } from "app/backend/graphql/generated/biz-graphql";

export const getLiveEvents = createAsyncThunk(
  "mailApp/liveevents/getLiveEvents",
  async (routeParams, { dispatch }) => {
    const client = await getApolloClient();
    var liveevents = null;
    const liveeventIndexRoute = routeParams.liveeventIndex;
    await client
      .query({
        fetchPolicy: "network-only",
        query: GetLiveEventsDocument,
      })
      .then((response) => {
        liveevents = response;
      })
      .catch((error) => {
        console.log(error);
      });

    const currentLiveEvent = {
      ...liveevents.data.liveevents[liveeventIndexRoute],
      index: liveeventIndexRoute,
    };

    const labels = liveevents.data.liveevents[liveeventIndexRoute].labels;

    dispatch(setLabels(labels));

    return { liveevents, routeParams, currentLiveEvent };
  }
);

const liveeventsAdapter = createEntityAdapter({});

export const { selectAll: selectLiveEvents, selectById: selectLiveEventById } =
  liveeventsAdapter.getSelectors((state) => state.mailApp.liveevents);

const mailsSlice = createSlice({
  name: "mailApp/liveevents",
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

export const { setSelectedLiveEventByIndex } = mailsSlice.actions;

export default mailsSlice.reducer;
