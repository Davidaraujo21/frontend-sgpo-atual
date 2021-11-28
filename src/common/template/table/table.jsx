import React from "react";

const Table = (props) => {
  return (
    <>
      <div className="row">
        <div className="col-xs-12">
            <table className="table table-hover">
              <thead>
                <tr className="row">
                  {props.headers.map((headerContent) => (
                    <th>{headerContent}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{props.children}</tbody>
            </table>
        </div>
      </div>
    </>
  );
};

export default Table;
