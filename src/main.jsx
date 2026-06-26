import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MatrixProvider } from "./context/MatrixContext";
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <MatrixProvider>
        <App />
      </MatrixProvider>
    </ThemeProvider>
  </StrictMode>
);