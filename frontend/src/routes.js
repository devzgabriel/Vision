import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Logon from './pages/Logon/index'
import Register from './pages/Register/index'
import Profile from './pages/Profile/index'
import WorkersInf from './pages/WorkersInf/index'
import WorkersNew from './pages/WorkersNew/index'
import Cameras from './pages/Cameras/index'

export default function Routes(){
  return(
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Logon}/>
      <Route path="/register" component={Register}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/worker/inf" component={WorkersInf}/>
      <Route path="/worker/new" component={WorkersNew}/>
      <Route path="/cameras" component={Cameras}/>
    </Switch>
    </BrowserRouter>
  )
}