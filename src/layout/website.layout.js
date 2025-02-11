import React, { useState, useEffect } from "react";

import SecHeader from "../components/header/Header2.desktop";
import Footer from "../components/footer/footer.desktop";

const WebsiteLayout = ({ children }) => {
  return (
    <React.Fragment>
      <SecHeader />
      <div className="">{children}</div>
      <Footer />
    </React.Fragment>
  );
};

export default WebsiteLayout;
