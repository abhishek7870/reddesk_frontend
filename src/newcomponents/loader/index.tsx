import React from "react";
import loader from "../../loader.svg";
function Loader() {
  return (
    <div className="loader-wrapper">
      <img src={loader} alt="Loading" />
    </div>
  );
}

export default Loader;
