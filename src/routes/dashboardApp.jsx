import React from 'react'
import Layout from '../common/template/layoutDashboard/layout'
import Routers from './routers'

const DashboardApp = () =>{
    return(
        <>
            <Layout>
                <Routers />
            </Layout>
        </>
    )
}

export default DashboardApp