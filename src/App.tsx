import React from "react";
import { CustomNavbar, Main } from "./components";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <Main>
        <Routes />
      </Main>
    </BrowserRouter>
  );
};

export default App;
