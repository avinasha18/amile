import { useState } from "react";
import Button from "@mui/material/Button";
import "./App.css";
export const PluginConnectButton = () => {
  const [userData, setUserData] = useState(null);

  const handleConnectClick = ({ pluginurl }) => {
    const portfolioWindow = window.open(
      `${pluginurl}?page=true&from=http://localhost:5173`,
      "PortfolioApp",
      "width=800,height=600"
    );

    const messageListener = (event) => {
      if (event.origin === "http://localhost:3000") {
        if (event.data && event.data.userData) {
          setUserData(event.data.userData);
          portfolioWindow.close();
        }
      }
    };

    window.addEventListener("message", messageListener);

    const cleanup = () => {
      window.removeEventListener("message", messageListener);
    };

    portfolioWindow.addEventListener("beforeunload", cleanup);
  };

  return (
      <Button variant="contained" onClick={handleConnectClick}>
        Connect
      </Button>
  );
};

export default App;
