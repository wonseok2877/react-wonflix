import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import "./api";
import "./styles/style.css";

ReactDom.render(<App />, document.querySelector("#root"));
