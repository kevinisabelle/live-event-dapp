import FusePageCarded from "@fuse/core/FusePageCarded";
import { Button } from "@mui/material";
import withReducer from "app/store/withReducer";
import { useEffect, useRef } from "react";
import { useMoralis } from "react-moralis";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import reducer from "./store";
import { getLiveEvents } from "./store/liveEventsSlice";

function LiveEvents(props) {
  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const routeParams = useParams();
  const { authenticate, signup, logout, isAuthenticated, user } = useMoralis();

  const liveEventFactoryContractAddess =
    "0x14a4433B872164183Ce74985AAC470F9B14cC56A";

  useEffect(() => {
    dispatch(getLiveEvents(routeParams));
  }, [dispatch, routeParams]);

  function connectUser() {
    authenticate();
  }

  function signupUser() {}

  function loginUser() {}

  function signupUser() {
    signup();
  }

  function disconectUser() {
    logout();
  }

  return (
    <FusePageCarded
      classes={{
        root: "w-full",
        content: "flex flex-col",
        header: "items-center min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        isAuthenticated ? (
          <div>
            Welcome {user.get("username")}
            <Button variant="contained" onClick={disconectUser}>
              Disconnect
            </Button>
          </div>
        ) : (
          <div>
            Guest user{" "}
            <Button variant="contained" onClick={connectUser}>
              Connect
            </Button>
          </div>
        )
      }
      contentToolbar={<div>Content toolbar</div>}
      content={<div>Content</div>}
      leftSidebarHeader={
        <div>
          <h2>Events</h2>
        </div>
      }
      leftSidebarContent={
        isAuthenticated ? (
          <div className="flex">
            <Button>Create Event</Button>
          </div>
        ) : (
          <div></div>
        )
      }
      ref={pageLayout}
      innerScroll
    />
  );
}

export default withReducer("LiveEvents", reducer)(LiveEvents);
