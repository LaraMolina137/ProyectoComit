import React,{useState,useEffect}from 'react';
import {Input, Radio, RadioGroup, FormControlLabel,Button,TextField, Modal , Popover} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import fetch from 'cross-fetch';
import {Redirect} from 'react-router-dom';
import {db} from '../firebase'
import '../styles/components/FormularioReserva.css';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';

function Alert(props) {
    return <MuiAlert elevation={1000} variant="standard" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
    //   display:'flex',
    //   flexDirection:'column',
    //   width:'30%',
    //   height:'330px',
    //   margin:'6%',
      borderColor:'white',
    //   border:'1px solid',
    //   padding:'2%',
    //   backgroundColor:'#fff',
    //   position: 'absolute',
    //   opacity: 0.94,
    //   top: '14%'
    },
    rootChildren:{
        display:'flex',
        flexDirection:'row',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    col:{
        flex: '1 1',
        margin:4
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: 200,
    },
    buscar: {
        // padding:10,
        // marginTop: theme.spacing(3),
        // marginLeft: theme.spacing(4),
    },
    titulo:{
        // marginLeft: theme.spacing(15),
        margin:0
    },
    cantidad:{
        paddingLeft:15,
        width: 50
    },
    disponible:{
        color:'red'
    }
}));

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const FormularioReserva = () => {
    const classes = useStyles();
    const [opcion,setOpcion] = useState('ida');
    const [lugarOrigen,setLugarOrigen] = useState('San Justo');
    const [lugarDestino,setLugarDestino] = useState('Mar del Plata');
    const [fechaIda,setFechaIda] = useState('2020-12-15');
    const [fechaVuelta,setFechaVuelta] = useState('2020-12-15');
    const [cantidad,setCantidad] = useState(1);

    const [busca,setBusca] = useState(false);
    const [apagado,setApagado] = useState(true);
    const [micros,setMicros] = useState([]);
    const [primerRender, setPrimerRender] = useState(true);


        const [openOrigen, setOpenOrigen] = useState(false);
        const [optionsOrigen, setOptionsOrigen] = useState([]);
        const loadingOrigen = openOrigen && optionsOrigen.length === 0;

        const [openDestino, setOpenDestino] = useState(false);
        const [optionsDestino, setOptionsDestino] = useState([]);
        const loadingDestino = openDestino && optionsDestino.length === 0;

        useEffect(() => {
            let active = true;

            if (!loadingOrigen && !loadingDestino) return undefined;
            
            (async () => {

                const response = await fetch('https://apis.datos.gob.ar/georef/api/municipios?max=5000');//('https://country.register.gov.uk/records.json?page-size=5000');
               // const res = await fetch('https://country.register.gov.uk/records.json?page-size=2000');
                await sleep(1e3); // For demo purposes.
                const jsonResponse = await response.json();
                const municipios = jsonResponse.municipios;
            
                municipios.push({id:"1814",nombre:"Mar del Plata"});
                municipios.push({id:"1815",nombre:"Mar de Ajó"});

                
                if (active) {
                    setOptionsOrigen(municipios.map((obj) => {return(obj.nombre)}));
                    setOptionsDestino(municipios.map((obj) => {return(obj.nombre)}));
                    }
            })();

            return () => {
                active = false;
            };

        }, [loadingOrigen,loadingDestino]);

        useEffect(() => {
            if (!openOrigen) {
                setOptionsOrigen([]);
            }
            if (!openDestino) {
                setOptionsDestino([]);
            }
        }, [openOrigen,openDestino]);


    useEffect(()=>{     
        if(opcion === "idaVuelta")
            setApagado(false);
        if(opcion === "ida")
            setApagado(true);
    },[opcion]);

    useEffect(()=>{
        if(!primerRender)
        {
            const indexBorrar = [];
            let index = 0;
            
            if(micros.length === 0){
                setAviso(true);
                return;
            }

            micros.forEach(micro=>{               
                if(micro.lugarSalida !== lugarOrigen || micro.lugarLlegada !== lugarDestino ||
                    micro.fechaSalida !== fechaIda || micro.cantidadAsiento < cantidad)
                    indexBorrar.push(index)

                index++
            });

            if(indexBorrar.length > 0) indexBorrar.sort((a,b)=>b-a)
           
            indexBorrar.forEach(index =>{micros.splice(index,1)})

            if(micros.length > 0)
                setBusca(true);
            else
            {
                setAviso(true);
                setOpen1(true);
            }
                
        }
        setPrimerRender(false);
    },[micros])
    
    const refMicro = db.collection('micro')

    function getMicros() { 
        const data = [];
        refMicro.get().then(querySnapshot=>{
            querySnapshot.forEach(doc => {
                data.push(doc.data());
            });
            setMicros([...data]); 

        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        getMicros();
    }

                const [aviso,setAviso] = useState(false);



                const [open1, setOpen1] = React.useState(false);

                const handleClose1 = (event, reason) => {
                    if (reason === 'clickaway') {
                    return;
                    }

                    setOpen1(false);
                };


return (
    <form className={classes.root} onSubmit={handleSubmit} >
        <h3 className={classes.titulo}>RESERVA TU PASAJE</h3>
        <RadioGroup className={classes.rootChildren} defaultValue="ida"  name="opcion"  value={opcion.value} onChange={(e)=>{setOpcion(e.target.value); setAviso(false)}}>
            <FormControlLabel className={classes.col} value="ida" control={<Radio color="primary"/>} label="IDA" labelPlacement="start"/>
            <FormControlLabel className={classes.col} value="idaVuelta" control={<Radio color="primary" />} label="IDA Y VUELTA" labelPlacement="start"/>
        </RadioGroup>
        <div className={classes.rootChildren}>
            <Autocomplete className={classes.col}    
                value={lugarOrigen}
                onChange={(e,valor)=>{setLugarOrigen(valor);setAviso(false)}}
                open={openOrigen}
                onOpen={() => {setOpenOrigen(true);}}
                onClose={() => {setOpenOrigen(false);}}
                options={optionsOrigen}
                loading={loadingOrigen}
                renderInput={(params) => ( <TextField {...params}  label="ORIGEN" variant="outlined" />)}
            />
            
            <Autocomplete className={classes.col}
                value={lugarDestino}
                onChange={(e,valor)=>{setLugarDestino(valor);setAviso(false)}}
                open={openDestino}
                onOpen={() => {setOpenDestino(true);}}
                onClose={() => {setOpenDestino(false);}}
                options={optionsDestino}
                loading={loadingDestino}
                renderInput={(params) => (<TextField {...params} label="DESTINO" variant="outlined"/>)}
            />
        </div>
        <div className={classes.rootChildren}>
            <TextField className={classes.textField} onChange={(e)=>{setFechaIda(e.target.value);setAviso(false)}} name="fechaIda" value={fechaIda} label="FECHA DE IDA" type="date" InputLabelProps={{shrink: true,}}/>
            <TextField disabled={apagado} className={classes.textField} onChange={(e)=>{setFechaVuelta(e.target.value);setAviso(false)}} name="fechaVuelta" value={fechaVuelta} label="FECHA DE VUELTA" type="date" InputLabelProps={{shrink: true,}}/>
        </div>
        <div className={classes.rootChildren}>
            <div className={classes.col}>
                <label htmlFor="">Personas </label>
                <Input  onChange={(e)=>{setCantidad(e.target.value);setAviso(false)}} className={classes.cantidad} name="cantidad" value={cantidad} inputProps={{ step: 1, min: 1, max: 5, type: 'number'}}/>
            </div>    
            <div className={classes.col}>
                <Button variant="contained" color="primary" type="submit"  className={classes.buscar}>BUSCAR VIAJES</Button>
            </div>
        </div>
        <div className={`${classes.rootChildren}  ${classes.disponible}`} >
            {aviso?'* NO HAY MICROS DISPONIBLES PARA ESA FECHA':' '}
        </div>
        {busca && <Redirect  to={{ pathname: "/viaje",
                                  state: { Micros: micros ,cantidadPasajero:cantidad} 
                                  }}/>}

        <Snackbar open={open1} onClose={handleClose1}>
            <Alert onClose={handleClose1} severity="info">
                Para encontrar micros dejar los datos por default y variar las personas, la base de datos es limitada.
                Para que vuelvan los datos recargar la pagina.
            </Alert>
        </Snackbar>
                  
    </form>
);};

export default FormularioReserva;


