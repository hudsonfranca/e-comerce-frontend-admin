import React, { useState } from "react";
import { CustomNavbar, Main } from "./components";
import { BrowserRouter } from "react-router-dom";
import { navbarContext } from "./NavbarContext";
import Routes from "./Routes";

const App: React.FC = () => {
  const [showNavItems, setShowNavItems] = useState(true);
  return (
    <navbarContext.Provider value={{ showNavItems, setShowNavItems }}>
      <BrowserRouter>
        <CustomNavbar />
        <Main>
          <Routes setShowNavItems={setShowNavItems} />
        </Main>
      </BrowserRouter>
    </navbarContext.Provider>
  );
};

export default App;
