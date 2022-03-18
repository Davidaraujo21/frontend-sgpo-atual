import React from "react";
import Modal from "./modal";
import './styles.css';

const ConfirmModal = ({ title, isOpen, toggle, action }) => {
  const footerButtons = () => {
    return (
      <>
        <button className="btn btn-secondary" onClick={toggle}>
          Cancelar
        </button>
        <button className="btn btn-primary" onClick={action}>
          Confirmar
        </button>
      </>
    );
  };

  return (
    <>
      <Modal
        title={<><i className="icon-alert-modal fa fa-warning"></i> Alerta de confirmação</>}
        isOpen={isOpen}
        footerButtons={footerButtons()}
        size={"md"}
      >
          <h1 className="title-alert-modal">{title}</h1>
      </Modal>
    </>
  );
};

export default ConfirmModal;
