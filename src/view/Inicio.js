import React from 'react';
import MenuAppBar from '../components/AppBar';
import FormularioReserva from '../components/FormularioReserva'
import Carrusel from '../components/Carrusel'

import {Redirect} from 'react-router-dom';

const Inicio = () => {


    return (
        <div>
            <MenuAppBar/>
            {/* <Carrusel/> */}
            <FormularioReserva/>
        </div>
    );
};

export default Inicio;