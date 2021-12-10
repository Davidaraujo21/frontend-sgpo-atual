import './styles.css'

const MsgAlert = ({text,closeToast, toastProps, onDelete}) => {
  return (
    <>
      <div>
        <p>
            {text}
        </p>
        <div className="buttons-msg">
          <button className="btn btn-sm btn-danger" onClick={onDelete}>Confirmar exclusão</button>
          <button className="btn btn-sm btn-primary" onClick={closeToast}>
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};


export default MsgAlert
