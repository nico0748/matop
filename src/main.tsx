import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/app.css";
import "./styles/preview.css";
import "./styles/print.css";
import "./styles/themes.css";
import "highlight.js/styles/github.css";
import "katex/dist/katex.min.css";

const root = document.getElementById("root");
if (!root) throw new Error("root element not found");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
