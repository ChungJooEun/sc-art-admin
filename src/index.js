import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowswerRouter } from "react-router-dom";

ReactDOM.render(
  <BrowswerRouter>
    <App />
  </BrowswerRouter>,
  document.getElementById("root")
);
