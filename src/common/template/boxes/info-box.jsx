import React from "react";
import Loading from "../effects/loading"
import "./styles.css";

const InfoBox = (props) => {
  return (
    <>
      <div className="box box-home">
        {props.isLoading && <Loading />}
        <div className="info-box">
          <span className={`info-box-icon bg-${props.color}`}>
            <i className={`fa fa-${props.icon}`}></i>
          </span>
          <div className="info-box-content">
            <span className="info-box-text">{props.label}</span>
            <span className="info-box-number">{props.value}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoBox;
