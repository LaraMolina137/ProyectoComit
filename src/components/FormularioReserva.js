import React,{useState,useEffect}from 'react';
import {Input, Radio, RadioGroup, FormControlLabel,Button,TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import fetch from 'cross-fetch';
import {Redirect} from 'react-router-dom';
import {db} from '../firebase'
import TablaViaje from './TablaViaje'

const useStyles = makeStyles((theme) => ({
    root: {
      display:'flex',
      flexDirection:'column',
      width:'30%',
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
        margin:2 
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
    const [lugarOrigen,setLugarOrigen] = useState('Paraguay');
    const [lugarDestino,setLugarDestino] = useState('Argentina');
    const [fechaIda,setFechaIda] = useState('2020-12-15');
    const [fechaVuelta,setFechaVuelta] = useState('');
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
                const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
                await sleep(1e3); // For demo purposes.
                const countries = await response.json();

                if (active) {
                setOptionsOrigen(Object.keys(countries).map((key) => countries[key].item[0]));
                setOptionsDestino(Object.keys(countries).map((key) => countries[key].item[0]));
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
        
        if(!primerRender && micros.length == 0)
            console.log('No hay micros para esa fecha')
        else
        {
            console.log(micros)
            if(!primerRender)
             setBusca(true);
        }
        setPrimerRender(false);
    },[micros])
    
    const refMicro = db.collection('micro')

    function getMicros() { 
         refMicro
        .where("lugarSalida", "==",lugarOrigen)
        .where("lugarLlegada", "==",lugarDestino)
        .where("fechaSalida", "==",fechaIda)
        .where("cantidadAsiento", ">=",cantidad)
        .onSnapshot((querySnapshot) => {
            
            const data = [];
            querySnapshot.forEach(doc => {
                console.log(doc.id, " => ", doc.data());
                data.push(doc.data());
            });
                setMicros([...data]); 
        })

    }

    
    function handleSubmit(e) {
        e.preventDefault();
        getMicros();
    }


return (
    <form className={classes.root} onSubmit={handleSubmit} >
        <h4>RESERVA TU PASAJE</h4>
        <RadioGroup className={classes.rootChildren} defaultValue="ida"  name="opcion"  value={opcion.value} onChange={(e)=>setOpcion(e.target.value)}>
            <FormControlLabel className={classes.col} value="ida" control={<Radio color="primary"/>} label="IDA" labelPlacement="start"/>
            <FormControlLabel className={classes.col} value="idaVuelta" control={<Radio color="primary" />} label="IDA Y VUELTA" labelPlacement="start"/>
        </RadioGroup>
        <div className={classes.rootChildren}>
            <Autocomplete className={classes.col}
                // onChange={(e,valor)=>{if(valor!=null) handleChange(e,valor.name,'lugarOrigen')}}
                onChange={(e,valor)=>{if(valor!=null)setLugarOrigen(valor.name)}}
                open={openOrigen}
                onOpen={() => {setOpenOrigen(true);}}
                onClose={() => {setOpenOrigen(false);}}
                getOptionSelected={(option, value) => option.name === value.name}
                getOptionLabel={(option) => option.name}
                options={optionsOrigen}
                loading={loadingOrigen}
                renderInput={(params) => ( <TextField {...params} label="ORIGEN" variant="outlined"/>)}
            />
            
            <Autocomplete className={classes.col}
                // onChange={(e,valor)=>{if(valor!=null) handleChange(e,valor.name,'lugarDestino')}}
                onChange={(e,valor)=>{if(valor!=null)setLugarDestino(valor.name)}}
                open={openDestino}
                onOpen={() => {setOpenDestino(true);}}
                onClose={() => {setOpenDestino(false);}}
                getOptionSelected={(option, value) => option.name === value.name}
                getOptionLabel={(option) => option.name}
                options={optionsDestino}
                loading={loadingDestino}
                renderInput={(params) => (<TextField {...params} label="DESTINO" variant="outlined"/>)}
            />
        </div>
        <div className={classes.rootChildren}>
            <TextField className={classes.textField} onChange={(e)=>setFechaIda(e.target.value)} name="fechaIda" value={fechaIda} label="FECHA DE IDA" type="date" InputLabelProps={{shrink: true,}}/>
            <TextField disabled={apagado} className={classes.textField} onChange={(e)=>setFechaVuelta(e.target.value)} name="fechaVuelta" value={fechaVuelta} label="FECHA DE VUELTA" type="date" InputLabelProps={{shrink: true,}}/>
        </div>
        <div className={classes.rootChildren}>
            <div className={classes.col}>
                <label htmlFor="">Personas </label>
                <Input onChange={(e)=>setCantidad(e.target.value)} name="cantidad" value={cantidad} inputProps={{ step: 1, min: 1, max: 3, type: 'number',}}/>
            </div>    
            <div className={classes.col}>
                <Button variant="contained" color="primary" type="submit"  className={classes.buscar}>BUSCAR VIAJES</Button>
            </div>
        </div>
        {busca && <Redirect  to={{ pathname: "/viaje",
                                  state: { Micros: micros } 
                                  }}/>}
  
    </form>
);

};

export default FormularioReserva;


