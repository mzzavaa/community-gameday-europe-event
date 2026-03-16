import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

// Tell Remotion's staticFile() about the Vite base path
(window as any).remotion_staticBase = import.meta.env.BASE_URL.replace(/\/$/, "");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
