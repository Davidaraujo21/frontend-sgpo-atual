import React, { useState, useCallback } from 'react'
import FormModal from '../../../common/template/form/form'
import Content from '../../../common/template/content/content'
import MenuActions from '../../../common/template/menuActions/menuActions'
import ProcessoDetail from './processoDetail'
import DcpDetail from './dcpDetail'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../../services/api'
import { toast } from 'react-toastify'

const Dcp = () =>{

    const [isEdit, setIsEdit] = useState(false);
    const {id} = useParams()
    const history = useHistory()

    const toggleIsEdit = useCallback(() =>{
        setIsEdit(!isEdit);
    }, [isEdit])

    const onDelete = useCallback(async () =>{
        try{
            await api.delete(`processos/${id}/`)
            toast.success("Processo deletado com sucesso")
            history.push("/listaProcessos")
        }catch(err){
            toast.error("Ocorreu um erro ao deletar o processo")
        }
    },[id, history])

    return(
        <Content title="Processo" action="Detalhes">
            <FormModal
            label={"DOCUMENTO DE CARACTERIZAÇÃO DE PROCESSO (DCP)"}
            color="info"
            actions={<MenuActions isEdit isDelete={!isEdit} isGerarDoc={!isEdit} toggleIsReadOnly={toggleIsEdit} onDelete={onDelete}/>}
            >
                {isEdit ? 
                    <ProcessoDetail toggleIsEdit={toggleIsEdit}/>    
                    :
                    <DcpDetail /> 
                }
            </FormModal>
        </Content>
    )
}


export default Dcp