import React, {useEffect, useState} from "react";
import Content from "../../common/template/content/content";
import InfoBox from "../../common/template/boxes/info-box";
import api from '../../services/api'
import {toast} from 'react-toastify'
import "./styles.css";

const Home = () => {

  const [componentesTotal, setComponentesTotal] = useState(0)
  const [macroprocessosTotal, setMacroprocessosTotal] = useState(0)
  const [processosTotal, setProcessosTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() =>{
    (async function(){
        setIsLoading(true)
        try{
            const componenteCount = api.get("componentes/?limit=1")
            const macroprocessoCount = api.get("macroprocessos/?limit=1")
            const processoCount = api.get("processos/?limit=1")
            const [componente, macroprocesso, processo] = await Promise.all([componenteCount, macroprocessoCount, processoCount])      
            setComponentesTotal(componente.data.count)
            setMacroprocessosTotal(macroprocesso.data.count)
            setProcessosTotal(processo.data.count)
            setIsLoading(false)
        }catch(err){
            setIsLoading(false)
            toast.error("Ocorreu um erro ao carregar dados")
        }
    })()
  },[])

  return (
    <>
      <Content title="Home">
        <div className="row">
          <div className="col-xs-4">
            <InfoBox color="aqua" label="Componentes" value={componentesTotal} icon="files-o" isLoading={isLoading}/>
          </div>
          <div className="col-xs-4">
            <InfoBox color="aqua" label="Macroprocessos" value={macroprocessosTotal} icon="files-o" isLoading={isLoading}/>
          </div>
          <div className="col-xs-4">
            <InfoBox color="aqua" label="Processos" value={processosTotal} icon="files-o" isLoading={isLoading}/>
          </div>
        </div>
      </Content>
    </>
  );
};

export default Home;
