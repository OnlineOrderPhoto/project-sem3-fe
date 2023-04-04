import React from "react";
import MainNavbar from "../../components/MainNavbar/MainNavbar";

// eslint-disable-next-line react/prop-types
const MainLayout = ({ children }) => {
  return (
    <>
      <MainNavbar></MainNavbar>
      {children}
      {/* <Footer></Footer> */}
    </>
  );
};

export default MainLayout;
