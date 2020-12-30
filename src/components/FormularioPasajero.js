import React,{useState}from 'react';
import {Button,TextField,Modal,Select,MenuItem,FormControl,InputLabel} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }

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
    //   position: 'absolute',
      opacity: 0.9,
    //   top: '10%'
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
    },

    paper: {
        overflow:'scroll',
        maxHeight:'400px',
        position: 'absolute',
        width: '50%',
        marginTop:'10%',
        marginLeft:'20%',
        marginRight:'20%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      buscar:{
        margin: theme.spacing(0, 1, 0),
      }
}));

const FormularioPasajero = (props) => {
    const classes = useStyles();

    const {location} = props;
    const micros = location.state.Micros;
    const cantidadPasajero = location.state.cantidadPasajero;

    const [nombre,setNombre] = useState('');
    const [apellido,setApellido] = useState('');
    const [nacionalidad,setNacionalidad] = useState('');
    const [sexo,setSexo] = useState('');
    const [fechaNac,setFechaNac] = useState('');
    const [dni,setDni] = useState('');
    const [pasajeros,setPasajeros] = useState([]);

    const [valor,setValor] = useState(Number(cantidadPasajero));
    const [numeroPasajero,setNumeroPasajero] = useState(1);


    function siguiente() {
        let pasajero = {nombre,apellido,nacionalidad,sexo,fechaNac,dni}
        if(pasajeros.length < cantidadPasajero)
            pasajeros.push(pasajero)

        if(valor===1) {
            handleOpen();
        }
        else
        {
            setValor(valor-1);
            setNombre('');
            setApellido('');
            setNacionalidad('');
            setSexo('');
            setFechaNac('');
            setDni('');
            setNumeroPasajero(numeroPasajero+1);
        }
        
    }

    function handleSubmit(e) {
        e.preventDefault();
        siguiente();
    }

                    const [modalStyle] = React.useState(getModalStyle);
                    const [open, setOpen] = React.useState(false);

                    const handleOpen = () => {
                        setOpen(true);
                    };

                    const handleClose = () => {
                        setOpen(false);
                    };

                    const body = (
                        <div  className={classes.paper}>{/*style={modalStyle}*/}
                            {/* <p id="simple-modal-description">
                                Gracias por reservar!!
                            </p> */}
                            {pasajeros.map(item=>{
                                return (<div>
                                    <h3>Datos del pasajero:</h3>
                                    <p>Nombre: {item.nombre}  Apellido: {item.apellido}</p> 
                                    <p>Dni: {item.dni}</p>              
                                </div>)
                            })}

                            <h3>Datos de la reserva</h3>
                            <p>Empresa: {micros.nombreEmpresa}</p>
                            <p>Tipo: {micros.tipo}</p>
                            <p>Lugar de Salida: {micros.lugarSalida}</p>
                            <p>Lugar de Llegada: {micros.lugarLlegada}</p>
                            <p>Fecha de Salida: {micros.fechaSalida}</p>
                            <p>Fecha de Llegada: {micros.fechaLlegada}</p>
                            <p>Hora de Salida: {micros.horaSalida}</p>
                            <p>Hora de Llegada: {micros.horaLlegada}</p>
                        </div>
                    );

    return (
            <form action=""  className={classes.root} onSubmit={handleSubmit}>
                <h1>Datos del Pasajero {numeroPasajero}</h1>
                {/* <Typography variant="h4" >Datos del Pasajero {numeroPasajero}</Typography> */}
                <div className={classes.rootChildren}> 
                    <TextField className={classes.col} value={nombre} onChange={(e)=>setNombre(e.target.value)} label="NOMBRE" variant="outlined" required/>
                    <TextField className={classes.col} value={apellido} onChange={(e)=>setApellido(e.target.value)} label="APELLIDO" variant="outlined" required/>
                </div>
                <div className={classes.rootChildren}>
                    <TextField className={classes.col} value={dni} onChange={(e)=>setDni(e.target.value)} label="DNI" variant="outlined" required/>
                    
                    {/* <TextField className={classes.col} value={sexo} onChange={(e)=>setSexo(e.target.value)} label="SEXO" variant="outlined" required/> */}
                    <FormControl variant="outlined" className={classes.col}>
                        <InputLabel htmlFor="outlined-age-native-simple">Sexo</InputLabel>
                        <Select
                            native
                            value={sexo}
                            onChange={(e)=>setSexo(e.target.value)}
                            label="Sexo"
                            inputProps={{
                                name: 'sexo',
                                id: 'outlined-age-native-simple',
                            }}
                            required
                        >
                            <option aria-label="None" value="" />
                            <option value={'F'}>F</option>
                            <option value={'M'}>M</option>
                        </Select>
                    </FormControl>
                </div>
                {/* <div className={classes.rootChildren}>
                    <TextField className={classes.col} value={nacionalidad} onChange={(e)=>setNacionalidad(e.target.value)} label="NACIONALIDAD" variant="outlined" required/>
                    <TextField className={classes.col} value={fechaNac} onChange={(e)=>setFechaNac(e.target.value)} label="FECHA DE NACIMIENTO" type="date" InputLabelProps={{shrink: true,}} required/>
                    
                </div> */}
                
                <Button variant="contained" color="primary"  type="submit" className={classes.buscar} 
                        >CONTINUAR</Button>
                <Modal open={open} onClose={handleClose}>{body}</Modal>
            </form> 
            
            

    );
};

export default withRouter(FormularioPasajero);



