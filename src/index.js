import * as ReactDOM from "react-dom/client";
import "./styles/index.css";
import AppRouter from "./components/AppRouter";
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "@material-tailwind/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  </Provider>
);
