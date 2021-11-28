import React, { useEffect, useState, useCallback} from 'react'
import { toast } from 'react-toastify'
import Content from '../../common/template/content/content'
import Table from '../../common/template/table/table'
import api from '../../services/api'
import ReactPaginate from 'react-paginate'
import BoxContent from '../../common/template/boxes/boxContent'
import Pagination from '../../common/template/pagination/pagination'

const ProcessoList = (props) =>{

    const [processos, setProcessos] = useState([])
    const itemsPerPage = 10
    const [offset, setOffSet] = useState(0)
    const [total, setTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() =>{
        (async function(){
            setIsLoading(true)
            try{
                const {data} = await api.get(`processos/?limit=${itemsPerPage}&offset=${offset}`)
                setProcessos(data.results)
                setTotal(data.count)
                setIsLoading(false)
            }catch(err){
                setIsLoading(false)
                toast.error("Ocorreu erro ao obter processos")
            }
        })()
    }, [offset])

    const handlePageClick = useCallback((event) =>{
        const newOffset = (event.selected * itemsPerPage) % total
        setOffSet(newOffset)
    }, [total])

    return(
        <>
            <Content title="Processos" action="lista">
            <BoxContent color="secondary" label="Lista de processos" load={isLoading}>
                <Table headers={["Nome", "Gestor", "Proprietário", "Código", "Ações"]}>
                    {
                    processos ? 
                    processos.map((processoContent) =>
                        <tr className="row">
                            <td>{processoContent.nome_processo}</td>
                            <td>{processoContent.gestorPrincipal}</td>
                            <td>{processoContent.proprietario}</td>
                            <td>{processoContent.codigo}</td>
                            <td><a className="btn btn-sm btn-primary" href="/">Detalhes</a></td>
                        </tr>
                    )
                    :
                    ""    
                    }
                </Table>
                <div className="row">
                    <Pagination handlePageClick={handlePageClick} pageCount={total} itemsPerPage={itemsPerPage}/>
                </div>
                </BoxContent>
            </Content>
        </>
    )
}


export default ProcessoList