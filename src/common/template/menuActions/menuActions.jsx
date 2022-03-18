import React from "react";
import "./styles.css";

const MenuActions = ({
  isEdit,
  isDelete,
  isGerarDoc,
  toggleIsReadOnly,
  onDelete,
  isFinalizar,
  handleFinalizar
}) => {
  return (
    <>
      <div className="row">
        <div className="col-xs-12 text-right">
          <div className="btn-group actions-group">
            {isFinalizar && (
              <button className="btn btn-sm btn-success" onClick={handleFinalizar}>
                <i className="fa fa-check"></i> Finalizar processo
              </button>
            )}
            {isEdit && (
              <button
                className="btn btn-sm btn-warning"
                onClick={toggleIsReadOnly}
              >
                <i className="fa fa-pencil"></i> Editar
              </button>
            )}
            {isDelete && (
              <button className="btn btn-sm btn-danger" onClick={onDelete}>
                <i className="fa fa-trash"></i> Excluir
              </button>
            )}
            {isGerarDoc && (
              <button className="btn btn-sm btn-info">
                <i className="fa fa-retweet"></i> Gerar documento
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuActions;
