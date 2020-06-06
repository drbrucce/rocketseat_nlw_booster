import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import CreatePoint from './pages/CreatePoint'
import Completed from './pages/Completed'

const Routes = ()=>{
    return(
    <BrowserRouter>
        <Route component={Home} path="/" exact/>
        <Route component={CreatePoint} path="/create-point"/>
        <Route component={Completed} path="/completed"/>
    </BrowserRouter>
    )
}

export default Routes