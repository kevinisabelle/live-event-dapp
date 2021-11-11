import FusePageCarded from "@fuse/core/FusePageCarded";
import { Button, Card, Link, TextField, Typography } from "@mui/material";
import withReducer from "app/store/withReducer";
import { useEffect, useRef, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
// import { web3 } from "moralis";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import reducer from "./store";
import LiveEventFactory from "abis/LiveEventFactory";
import pathToRegexp from "path-to-regexp";
import LiveEventTicket from "abis/LiveEventTicket";
import routes from "app/fuse-configs/routesConfig";

function LiveEvents(props) {
  const dispatch = useDispatch();
  const [eventsOwners, setEventsOwners] = useState([]);
  const [eventsAvailable, setEventsAvailable] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const pageLayout = useRef(null);
  const routeParams = useParams();
  const { authenticate, logout, isAuthenticated, user, authError } =
    useMoralis();
  const [userEmail, setUserEmail] = useState(user?.getEmail() ?? "");
  const liveEventFactoryContractAddess =
    "0xca3b204cEE1850124C6F80a42848135E9f09F0fE";
  const toPath = pathToRegexp.compile(props.match.path);

  var contract = new web3.eth.Contract(
    LiveEventFactory.abi,
    liveEventFactoryContractAddess
  );

  useEffect(() => {
    getEventsOwners();

    if (routeParams.eventOwner) {
      getEvents(routeParams.eventOwner);
    }

    if (routeParams.eventAddress) {
      getEventDetails(routeParams.eventAddress);
    }
  }, [dispatch, routeParams, web3]);

  async function connectUser() {
    await authenticate();
  }

  async function signupDetails() {
    try {
      user.setEmail(userEmail);
      await user.save();
    } catch (error) {
      console.error(error);
    }
  }

  async function logoutUser() {
    await logout();
  }

  var name = "Another great show";
  var location = "San Juan, Puerto Rico";
  var categories = ["Vip", "Regular"];
  var prices = [5000, 1000];
  var seatCounts = [100, 500];
  var resellableHigher = [true, false];

  function publishEvent() {
    contract.methods
      .createLiveEvent(
        name,
        location,
        prices,
        categories,
        seatCounts,
        resellableHigher
      )
      .send({ from: ethereum.selectedAddress, value: 0 })
      .on("receipt", function (receipt) {
        console.log(receipt);
      });
  }

  function getEventsOwners() {
    contract.methods
      .getOwners()
      .call({ from: ethereum.selectedAddress })
      .then(function (result) {
        setEventsOwners(result);
      });
  }

  function HandleNavigateSpace(space) {
    props.history.push(
      toPath({
        documentSpaceId: space.id,
        documentFolderId: null,
        documentId: null,
      })
    );
  }

  function NavigateToEventOwner(ownerAddress) {
    props.history.push(
      toPath({
        eventOwner: ownerAddress,
        eventAddress: null,
      })
    );
  }

  function NavigateToEventDetails(eventAddress) {
    props.history.push(
      toPath({
        eventOwner: routeParams.eventOwner,
        eventAddress: eventAddress,
      })
    );

    getEventDetails(eventAddress);
  }

  function getEvents(owner) {
    contract.methods
      .getEvents(owner)
      .call({ from: ethereum.selectedAddress })
      .then(function (result) {
        setEventsAvailable(result);
      });
  }

  function getEventDetails(eventAddress) {
    var eventContract = new web3.eth.Contract(
      LiveEventTicket.abi,
      eventAddress
    );

    eventContract.methods
      ._name()
      .call({ from: ethereum.selectedAddress })
      .then(function (result) {
        setCurrentEvent({ name: result });
      });
  }

  function setEmailState(ev) {
    setUserEmail(ev.target.value);
  }

  function setPasswordState(ev) {
    setPassword(ev.target.value);
  }

  function setUsernameState(ev) {
    setUsername(ev.target.value);
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
            <Button variant="contained" onClick={logoutUser}>
              Disconnect
            </Button>
            <TextField
              label="Email"
              value={userEmail}
              onChange={setEmailState}
            />
            <Button variant="contained" onClick={signupDetails}>
              Set email
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
      content={
        <div>
          {authError && <h4>{authError.message}</h4>}
          {isAuthenticated && (
            <div>
              {eventsOwners.length > 0 && (
                <Card className="p-10 m-5 flex flex-col" elevation={5}>
                  {eventsOwners.map((eo) => (
                    <Link key={eo} onClick={(ev) => NavigateToEventOwner(eo)}>
                      {eo}
                    </Link>
                  ))}
                </Card>
              )}

              {routeParams.eventOwner && (
                <Card className="p-10 m-5" elevation={5}>
                  <Typography variant="h3">{routeParams.eventOwner}</Typography>

                  {eventsAvailable.length > 0 && (
                    <Card className="p-10 m-5 flex flex-col" elevation={5}>
                      {eventsAvailable.map((ea) => (
                        <Link
                          key={ea}
                          onClick={(ev) => NavigateToEventDetails(ea)}
                        >
                          {ea}
                        </Link>
                      ))}
                    </Card>
                  )}
                </Card>
              )}

              {routeParams.eventAddress && (
                <Card className="p-10 m-5 flex flex-col" elevation={5}>
                  <Typography variant="h5">
                    Event Details {routeParams.eventAddress}
                    {currentEvent && <div>{currentEvent.name}</div>}
                  </Typography>
                  <hr />
                </Card>
              )}
            </div>
          )}
        </div>
      }
      leftSidebarHeader={
        <div>
          <h2>Events</h2>
        </div>
      }
      leftSidebarContent={
        isAuthenticated ? (
          <div className="">
            <Button onClick={publishEvent}>Create Event</Button>
            <Button onClick={getEvents}>Get Events</Button>
            <Button onClick={getEventsOwners}>Get Events Owner</Button>
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
