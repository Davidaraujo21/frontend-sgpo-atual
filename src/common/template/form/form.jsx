import React from "react";
import "./styles.css";
import Loading from "../effects/loading";

const FormModal = (props) => {
  return (
    <>
      <div className={`box box-${props.color}`} style={{width: `${props.width ? props.width : 'auto'}`}}>
        {props.loadingSubmit && <Loading />}
        <div className="box-header with-border">
          {props.hasImg ? (
            <h4 className="text-center">
              <img width={100} height={100} src={props.img} alt="Logo Sgpo login" />
            </h4>
          ) : (
            <>
              <h4>{props.label}</h4>
              <div>{props.actions ? props.actions : ""}</div>
            </>
          )}
        </div>
        <div className="box-body">{props.children}</div>
      </div>
    </>
  );
};

export default FormModal;
