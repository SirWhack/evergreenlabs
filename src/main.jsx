import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SITE } from "./content/siteData.js";
import "./styles/colors_and_type.css";
import "./styles/styles.css";

const titleName = SITE.profile.fullName || SITE.profile.name || "sam";
document.title = titleName.toLowerCase();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
