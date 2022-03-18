import React from "react";

const Modal = ({title, children, isOpen, toggle, footerButtons, size}) => {
  return (
    <>
      <div className={`modal fade ${isOpen && "in"}`} id="myModal" style={isOpen ? {display: "block"} : {display: "none"}}>
        <div className={`modal-dialog modal-${size ? size : 'lg'}`} role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 class="modal-title">{title}</h4>
            </div>
            <div className="modal-body">
              {children}
            </div>
            <div className="modal-footer">
                {footerButtons}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
