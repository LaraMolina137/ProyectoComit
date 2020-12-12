import React,{useState,useEffect}from 'react';
import {Input, Radio, RadioGroup, FormControlLabel,Button,TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
// import { borderColor } from '@material-ui/system';

import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import fetch from 'cross-fetch';

import {Redirect} from 'react-router-dom';

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
    const [values,setValues] = useState({
        opcion:false,
        lugarOrigen:null,
        lugarDestino:'',
        fechaIda:'',
        fechaVuelta:'',
        cantidad:0
    });
    const [busca,setBusca] = useState(false);

    // const [provincias,setProvincias] =useState([]);

    // useEffect(
    //     async() =>{
    //         const response = await fetch("https://apis.datos.gob.ar/georef/api/provincias")
    //         const dataProvincia = await response.json();
    //         setProvincias(dataProvincia.provincias);
    // },[])


    // const opciones = provincias.map((provincia)=>{
    //     return(
    //         <option key={provincia.id} value={provincia.nombre} >{provincia.nombre}</option>
    //     )}
    // )
    
    function handleChange(e){
        // console.log(e);
        setValues({ ...values, [e.target.name]: [e.target.value] });
    }  

    function handleSubmit(e) {
        e.preventDefault();
        console.log(values);
        setBusca(true);
        
    }



        const [openOrigen, setOpenOrigen] = useState(false);
        const [optionsOrigen, setOptionsOrigen] = useState([]);
        const loadingOrigen = openOrigen && optionsOrigen.length === 0;

        const [openDestino, setOpenDestino] = useState(false);
        const [optionsDestino, setOptionsDestino] = useState([]);
        const loadingDestino = openDestino && optionsDestino.length === 0;

        useEffect(() => {
            let active = true;

            if (!loadingOrigen && !loadingDestino) {
                return undefined;
            }
            

            (async () => {
                const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
                await sleep(1e3); // For demo purposes.
                const countries = await response.json();

                if (active) {
                setOptionsOrigen(Object.keys(countries).map((key) => countries[key].item[0]));
                setOptionsDestino(Object.keys(countries).map((key) => countries[key].item[0]));
                }
            })
            ();

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

          
  
    return (
        <form className={classes.root} onSubmit={handleSubmit} >
                    <h4>RESERVA TU PASAJE</h4>
                    <RadioGroup className={classes.rootChildren} defaultValue="ida"  name="opcion"  value={values.opcion.value} onChange={handleChange}>
                            <FormControlLabel 
                                className={classes.col}
                                value="ida"
                                control={<Radio color="primary"/>}
                                label="IDA"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                className={classes.col}
                                value="idaVuelta"
                                control={<Radio color="primary" />}
                                label="IDA Y VUELTA"
                                labelPlacement="start"
                            />
                    </RadioGroup>

                    {/* <div className={classes.rootChildren}>
                         <Autocomplete className={classes.col}
                                // onChange={handleChange}
                                // value={values.lugarOrigen}
                                id="origen"
                                open={openOrigen}
                                onOpen={() => {
                                    setOpenOrigen(true);
                                }}
                                onClose={() => {
                                    setOpenOrigen(false);
                                }}
                                getOptionSelected={(option, value) => option.name === value.name}
                                getOptionLabel={(option) => option.name}
                                options={optionsOrigen}
                                loading={loadingOrigen}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="ORIGEN"
                                        variant="outlined"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                            <React.Fragment>
                                                {loadingOrigen ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                            ),
                                        }}
                                    />
                                )}
                                />
                                <Autocomplete className={classes.col}
                                    // onChange={handleChange}
                                    // value={values.lugarDestino}
                                    id="origen"
                                    open={openDestino}
                                    onOpen={() => {
                                        setOpenDestino(true);
                                    }}
                                    onClose={() => {
                                        setOpenDestino(false);
                                    }}
                                    getOptionSelected={(option, value) => option.name === value.name}
                                    getOptionLabel={(option) => option.name}
                                    options={optionsDestino}
                                    loading={loadingDestino}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        label="DESTINO"
                                        variant="outlined"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                            <React.Fragment>
                                                {loadingDestino ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                            ),
                                        }}
                                        />
                                    )}
                                />
        
                    </div> */}
                    {/* <div className={classes.rootChildren}>
                    <TextField
                        onChange={handleChange}
                        name="fechaIda"
                        value={values.fechaIda}
                        id="dateIda"
                        label="FECHA DE IDA"
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                        onChange={handleChange}
                        name="fechaVuelta"
                        value={values.fechaVuelta}
                        id="dateVuelta"
                        label="FECHA DE VUELTA"
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    </div> */}

                    <div className={classes.rootChildren}>
                        <div className={classes.col}>
                            <label htmlFor="">Personas </label>
                            <Input
                                onChange={handleChange}
                                name="cantidad"
                                value={values.cantidad}
                                inputProps={{
                                step: 1,
                                min: 0,
                                max: 3,
                                type: 'number',
                                }}
                            />
                        </div>
                            
                        <div className={classes.col}>
                            <Button variant="contained" color="primary" type="submit"  className={classes.buscar}>BUSCAR VIAJES</Button>
                        </div>
                    </div>


                    {busca  && <Redirect to="/viaje"/>}
        </form>
    );
};

export default FormularioReserva;


