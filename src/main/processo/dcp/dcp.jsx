import React, { useState, useCallback, useEffect, useContext } from "react";
import FormModal from "../../../common/template/form/form";
import Content from "../../../common/template/content/content";
import MenuActions from "../../../common/template/menuActions/menuActions";
import ProcessoDetail from "./processoDetail";
import DcpDetail from "./dcpDetail";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";
import {UserContext} from '../../../store/UserContext/context';
import ConfirmModal from "../../../common/template/modal/confirmModal";


const Dcp = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const [processoStatus, setProcessoStatus] = useState("");
  const contexto = useContext(UserContext);
  const {stateUser:{ tipo_usuario }} = contexto;
  const [isConfirm, setIsConfirm] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  useEffect(() => {
    (async function () {
      try {
        const {
          data
        } = await api.get(`processos/${id}/`);
        setProcessoStatus(data.statusProcesso);
      } catch (err) {
        toast.error("Ocorreu um erro o status do processo");
      }
    })();
  }, [id]);

  const toggleIsEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit]);

  const onDelete = async () => {
    try {
      await api.delete(`processos/${id}/`);
      toast.success("Processo deletado com sucesso");
      history.push("/listaProcessos");
      toggleDeleteModal();
    } catch (err) {
      toast.error("Ocorreu um erro ao deletar o processo");
      toggleDeleteModal();
    }
  };

  const handleFinalizarProcesso = async () => {
    try {
      const statusObj = {
        statusProcesso: "Finalizado",
      };
      await api.patch(`processos/${id}/`, statusObj);
      toast.success("O processo foi finalizado com sucesso");
      history.push("/listaProcessos");
      toggleFinalizarModal();
    } catch (err) {
      toast.error("Ocorreu um erro ao finalizar o processo");
      toggleFinalizarModal();
    }
  };

  const toggleFinalizarModal = () =>{
    setIsConfirm(!isConfirm)
  }

  const toggleDeleteModal = () =>{
    setIsDelete(!isDelete)
  }

  return (
    <Content title="Processo" action="Detalhes">
      <ConfirmModal 
        title="Confirmar finalização do processo?"
        isOpen={isConfirm}
        toggle={toggleFinalizarModal}
        action={handleFinalizarProcesso}
      />
      <ConfirmModal 
        title="Confirmar exclusão do processo?"
        isOpen={isDelete}
        toggle={toggleDeleteModal}
        action={onDelete}
      />
      <FormModal
        label={"DOCUMENTO DE CARACTERIZAÇÃO DE PROCESSO (DCP)"}
        color="info"
        actions={
          (processoStatus && tipo_usuario) &&
          (processoStatus === "Finalizado" ? (
            <MenuActions isDelete isGerarDoc onDelete={toggleDeleteModal} />
          ) : (
            <MenuActions
              isEdit
              isDelete={!isEdit}
              isFinalizar={!isEdit && tipo_usuario === 1}
              isGerarDoc={!isEdit}
              toggleIsReadOnly={toggleIsEdit}
              onDelete={toggleDeleteModal}
              handleFinalizar={toggleFinalizarModal}
            />
          ))
        }
      >
        {isEdit ? (
          <ProcessoDetail id={id} toggleIsEdit={toggleIsEdit} />
        ) : (
          <DcpDetail id={id} />
        )}
      </FormModal>
    </Content>
  );
};

export default Dcp;
