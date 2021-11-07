import FuseAuthorization from "@fuse/core/FuseAuthorization";
import FuseLayout from "@fuse/core/FuseLayout";
import FuseTheme from "@fuse/core/FuseTheme";
import history from "@history";
import { Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { useSelector } from "react-redux";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { selectCurrLangDir } from "app/store/i18nSlice";
import withAppProviders from "./withAppProviders";
import { Auth } from "./auth";
import { MoralisProvider } from "react-moralis";

// import axios from 'axios';
/**
 * Axios HTTP Request defaults
 */
// axios.defaults.baseURL = "";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

const emotionCacheOptions = {
  rtl: {
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
    prepend: true,
  },
  ltr: {
    key: "muiltr",
    stylisPlugins: [],
    prepend: true,
  },
};

const App = () => {
  const langDirection = useSelector(selectCurrLangDir);

  return (
    <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
      <MoralisProvider
        appId="M2T4z2Dl3BD0KKwN5rRsWJs98Ns9cvp4VE386zmQ"
        serverUrl="https://dzbp07gsb44o.usemoralis.com:2053/server"
      >
        <Auth>
          <Router history={history}>
            <FuseAuthorization>
              <FuseTheme>
                <SnackbarProvider
                  maxSnack={5}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  classes={{
                    containerRoot:
                      "bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99",
                  }}
                >
                  <FuseLayout />
                </SnackbarProvider>
              </FuseTheme>
            </FuseAuthorization>
          </Router>
        </Auth>
      </MoralisProvider>
    </CacheProvider>
  );
};

export default withAppProviders(App)();
