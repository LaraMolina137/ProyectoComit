import React from 'react';
import MenuAppBar from '../components/AppBar';
import FormularioReserva from '../components/FormularioReserva'
import SwipeableTextMobileStepper from '../components/Carrusel'

const Inicio = () => {

    return (
        <div>
            <MenuAppBar/>
            <SwipeableTextMobileStepper/>
            <FormularioReserva/>
        </div>
    );
};

export default Inicio;