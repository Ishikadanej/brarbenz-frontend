import React from "react";
import Header from "../components/Header";

const Headernew = () => {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 bg-white "
      style={{ zIndex: 1 }}
    >
      <Header />
    </div>
  );
};

export default Headernew;
