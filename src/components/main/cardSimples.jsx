import React from "react";
import "./cardSimples.css";

export default function CardSimples(props) {
  return (
    <div className="card card-dcp text-center">
      <div className="card-header bg-header">{props.header}</div>
      <div className="card-body card-dcp-body">{props.children}</div>
    </div>
  );
}
