import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Profile from './pages/Profile';
import Register from './pages/Register';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path = "/profile" component={Profile} />
                <Route path = "/cadastro" component={Register} />
                <Route path = "/" exact component={Logon} />
            </Switch>
        </BrowserRouter>

    )
}