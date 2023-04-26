import React from "react";
import { useHistory } from "react-router-dom";

const Secenekler = () => {
  const history = useHistory();

  const handleMain = () => {
    history.push("/");
  };
  return (
    <>
      <div className="secenekler">
        {" "}
        <h1>SEÇENEKLER</h1>
        <p>Sayfa hazırlanıyor...</p>
        <button id="aciktim" onClick={handleMain}>
          ANASAYFAYA DÖN
        </button>
      </div>
    </>
  );
};

export default Secenekler;