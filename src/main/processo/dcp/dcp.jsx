import React, { useState, useCallback } from 'react'
import FormModal from '../../../common/template/form/form'
import Content from '../../../common/template/content/content'
import MenuActions from '../../../common/template/menuActions/menuActions'
import ProcessoDetail from './processoDetail'
import DcpDetail from './dcpDetail'

const Dcp = () =>{

    const [isEdit, setIsEdit] = useState(false);

    const toggleIsEdit = useCallback(() =>{
        setIsEdit(!isEdit);
    }, [isEdit])

    return(
        <Content title="Processo" action="Detalhes">
            <FormModal
            label={"DOCUMENTO DE CARACTERIZAÇÃO DE PROCESSO (DCP)"}
            color="info"
            actions={<MenuActions isEdit isDelete isGerarDoc={!isEdit} toggleIsReadOnly={toggleIsEdit}/>}
            >
                {isEdit ? 
                    <ProcessoDetail />    
                    :
                    <DcpDetail />
                }
            </FormModal>
        </Content>
    )
}


export default Dcp