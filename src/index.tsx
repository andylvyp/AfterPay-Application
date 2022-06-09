import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import "./index.scss";

const container = document.getElementById("root");
ReactDOMClient.createRoot(container!).render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>,
);
