import React from "react";
import { addDecorator } from "@storybook/react";
import "../src/i18n";
//import '@fake-db';
import FuseTheme from "@fuse/core/FuseTheme";
import { SnackbarProvider } from "notistack";
import { create } from "jss";
import jssExtend from "jss-plugin-extend";
import rtl from "jss-rtl";
import Provider from "react-redux/es/components/Provider";
import AppContext from "../src/app/AppContext";
import routes from "../src/app/fuse-configs/routesConfig";
import store from "../src/app/store";
import "typeface-poppins";
import "../src/styles/app-base.css";
import "../src/styles/app-components.css";
import "../src/styles/app-utilities.css";
import { Paper } from "@mui/material";
import {
  createGenerateClassName,
  jssPreset,
  StylesProvider,
} from "@mui/styles";

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend(), rtl()],
  insertionPoint: document.getElementById("jss-insertion-point"),
});

const generateClassName = createGenerateClassName({ disableGlobal: true });

addDecorator((story) => (
  <AppContext.Provider
    value={{
      routes,
    }}
  >
    <StylesProvider jss={jss} generateClassName={generateClassName}>
      <Provider store={store}>
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
            <Paper className="p-10" elevation={5}>
              {story()}
            </Paper>
          </SnackbarProvider>
        </FuseTheme>
      </Provider>
    </StylesProvider>
  </AppContext.Provider>
));
