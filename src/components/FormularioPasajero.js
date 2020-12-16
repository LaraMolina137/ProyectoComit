import React from 'react';
import MenuAppBar from './AppBar'
import {Button,TextField} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display:'flex',
      flexDirection:'column',
      width:'43%',
      height:'330px',
      margin:'6%',
      borderColor:'#EFEEE6',
      border:'1px solid',
      padding:'2%',
      backgroundColor:'#fff',
      position: 'absolute',
      opacity: 0.9,
      top: '10%'
    },
    rootChildren:{
        display:'flex',
        flexDirection:'row',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    col:{
        flex: '1 1',
        margin: 10
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: 200,
    }
}));

const FormularioPasajero = () => {
    const classes = useStyles();

    // const [nombre,setNombre] = useState('');
    // const [apellido,setApellido] = useState('');
    // const [nacionalidad,setNacionalidad] = useState('');
    // const [sexo,setSexo] = useState('');
    // const [fechaNac,setFechaNac] = useState('');
    // const [dni,setDni] = useState('');

    return (
        <div>
            <MenuAppBar/>
            <form action=""  className={classes.root}>
                <h1>Datos del Pasajero</h1>
                <div className={classes.rootChildren}> 
                    <TextField className={classes.col} label="NOMBRE" variant="outlined" />
                    <TextField className={classes.col} label="APELLIDO" variant="outlined"/>
                </div>
                <div className={classes.rootChildren}>
                    <TextField className={classes.col} label="NACIONALIDAD" variant="outlined"/>
                    <TextField className={classes.col} label="SEXO" variant="outlined"/>
                </div>
                <div className={classes.rootChildren}>
                    <TextField className={classes.col} label="FECHA DE NACIMIENTO" type="date" InputLabelProps={{shrink: true,}}/>
                    <TextField className={classes.col} label="DNI" variant="outlined"/>
                </div>
                
                <Button variant="contained" color="primary" type="submit"  className={classes.buscar} onClick={()=>alert("Gracias por reservar tu micro!!!")}>CONTINUAR</Button>
               
               
            </form>
        </div>
    );
};

export default FormularioPasajero;