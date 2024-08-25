import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import 'regenerator-runtime/runtime';

import "./index.css";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
