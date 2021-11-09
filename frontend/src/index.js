// Internet Explorer 11 requires polyfills and partially supported by this project.
// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';
import ReactDOM from "react-dom";
import "./i18n";
import "./styles/app-base.css";
import "./styles/app-components.css";
import "./styles/app-utilities.css";
import App from "app/App";
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from "./reportWebVitals";
import Web3 from "web3";

if (window.ethereum) {
  window.web3 = new Web3(ethereum);
}
// Legacy dapp browsers...
else if (window.web3) {
  window.web3 = new Web3(web3.currentProvider);
}
// Non-dapp browsers...
else {
  throw new Error(
    "Non-Ethereum browser detected. You should consider trying MetaMask!"
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
