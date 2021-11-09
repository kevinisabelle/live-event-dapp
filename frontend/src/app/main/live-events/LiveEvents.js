import FusePageCarded from "@fuse/core/FusePageCarded";
import { Button, TextField } from "@mui/material";
import withReducer from "app/store/withReducer";
import { useEffect, useRef, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
// import { web3 } from "moralis";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import reducer from "./store";
import { getLiveEvents } from "./store/liveEventsSlice";
import LiveEventFactory from "abis/LiveEventFactory";
import Web3 from "web3";
import LiveEventTicket from "abis/LiveEventTicket";

function LiveEvents(props) {
  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const routeParams = useParams();
  const { authenticate, logout, isAuthenticated, user, authError } =
    useMoralis();
  const [userEmail, setUserEmail] = useState(user?.getEmail() ?? "");
  const liveEventFactoryContractAddess =
    "0x14a4433B872164183Ce74985AAC470F9B14cC56A";

  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
  }
  // Non-dapp browsers...
  else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
    return;
  }

  var contract = new web3.eth.Contract(
    LiveEventFactory.abi,
    liveEventFactoryContractAddess
  );
  console.log(contract);

  useEffect(() => {
    // dispatch(getLiveEvents(routeParams));
  }, [dispatch, routeParams, web3]);

  /*
  window.web3 = await Moralis.Web3.enable();
  
  */

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

  var name = "New Event";
  var location = "New location";
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

  function getEvents() {
    contract.methods
      .liveEvents(ethereum.selectedAddress, 0)
      .call({ from: ethereum.selectedAddress })
      .then(function (result) {
        var eventContract = new web3.eth.Contract(LiveEventTicket.abi, result);
        eventContract.methods
          ._name()
          .call({ from: ethereum.selectedAddress })
          .then(function (name) {
            console.log(name);
          });
      });
  }

  /*function flip(e) {
    let side = document.getElementById("heads").checked ? 0 : 1;
    let amount = document.getElementById("roll_input").value;
    contract.methods
      .flip(side)
      .send({ from: ethereum.selectedAddress, value: amount })
      .on("receipt", function (receipt) {
        if (receipt.events.bet.returnValues.win) {
          displayNotification(true, receipt.events.bet.returnValues.bet);
        } else {
          displayNotification(false, receipt.events.bet.returnValues.bet);
        }
      });
  }*/

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
          {isAuthenticated && <div></div>}
        </div>
      }
      leftSidebarHeader={
        <div>
          <h2>Events</h2>
        </div>
      }
      leftSidebarContent={
        isAuthenticated ? (
          <div className="flex">
            <Button onClick={publishEvent}>Create Event</Button>
            <Button onClick={getEvents}>Get Events</Button>
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
