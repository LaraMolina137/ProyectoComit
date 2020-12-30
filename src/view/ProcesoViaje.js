import React from 'react';
import MenuAppBar from '../components/AppBar'
import FormularioPasajero from '../components/FormularioPasajero'
import DibujoMicro from '../components/DibujoMicro'
import { makeStyles } from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      display:'flex',
      padding:'2%'
    }
}));

const ProcesoViaje = (props) => {
    const classes = useStyles();

    const {location} = props;
    const micros = location.state.Micros;
    const cantidadPasajero = location.state.cantidadPasajero;

    return (
        <div>
            <MenuAppBar/>
            <div className={classes.root}>
                {/* <DibujoMicro cantidadPasajero={cantidadPasajero}/> */}
                <FormularioPasajero/>
            </div>
        </div>
    );
};

export default withRouter(ProcesoViaje);