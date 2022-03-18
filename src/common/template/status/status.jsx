import React from "react";

const Status = ({ statusName }) => {
  const getStatus = () => {
    const objStatus = {
      "em aberto": "warning",
      finalizado: "success",
    };
    return objStatus[statusName.toLowerCase()] ? objStatus[statusName.toLowerCase()] : "primary";
  };

  return (
    <>
      <span className={`label label-${getStatus()}`}>{statusName}</span>
    </>
  );
};

export default Status;
