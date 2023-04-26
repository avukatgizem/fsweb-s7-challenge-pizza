import React from "react";
import { useHistory } from "react-router-dom";
import "./success.css";

const Success = () => {
  const history = useHistory();

  const handleMain = () => {
    history.push("/");
  };
  return (
    <>
      <div className="success">
        <div>
          <h1>Teknolojik Yemekler</h1>
          <br />
          <br />
          <br />
        </div>
        <div className="alt-kisim">
          <p className="lezzet">lezzetin yolda</p>
          <p className="KodAciktirir">
            TEBRİKLER <br /> SİPARİŞİNİZ ALINDI!
            <br />
          </p>
          <button id="aciktim" onClick={handleMain}>
            ANASAYFAYA DÖN
          </button>
        </div>
      </div>
    </>
  );
};

export default Success;