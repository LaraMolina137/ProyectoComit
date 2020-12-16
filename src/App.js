import React from "react";
import Inicio from './view/Inicio'
import Viaje from './components/Viaje'
import FormularioPasajero from './components/FormularioPasajero'
import './index.css'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

const App = () => (
    <Router>
        <Switch>
            <Route path="/pasajero"><FormularioPasajero/></Route>
            <Route path="/viaje"><Viaje/></Route>
            <Route path="/" exact><Inicio/></Route>
        </Switch>
    </Router>         
);
export default App;

