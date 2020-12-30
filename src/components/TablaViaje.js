import React from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Typography} from '@material-ui/core';
import '../styles//components/TablaViaje.css';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

const useStyles = makeStyles((theme) => ({
    root: {
        display:'flex',
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
        marginTop: theme.spacing(10),

        padding: theme.spacing(2),
        // border:'2px solid black',
        // position: 'absolute',
        // width:900,
        // borderRadius: 20,

        // backgroundColor:'#D8DEC8',
        top: '13%'
    },
    tabla:{
        display:'flex',
        flex: '1 1',
        flexDirection:'column',
        backgroundColor:'#D8DEC8',

        border:'1px solid white',
        borderRadius: 10,
        
        
    },
    head: {
        display:'flex',
        flexDirection:'column',
        backgroundColor: '#3f51b5',
        borderRadius: 10,

        border:'1px solid white',

    },
    rowHead:{
        display:'flex',
        flex: '1 1',
    },
    headTh:{
        flex: '1 1',
        padding: theme.spacing(2),  
        backgroundColor: '#3f51b5',
        textAlign:'center',

        color: 'white',
    },
    body: {
        display:'flex',
        flexDirection:'column',
    },
    rowBody:{
        display:'flex',
        flex: '1 1',
    },
    bodyTd:{
        flex: '1 1',
        textAlign: 'center',
        padding: theme.spacing(2),  
    },
    seleccionar:{
        backgroundColor:'white',
        fontSize:'10px',
        width: '83px'

    },
    seleccionar1:{
        textAlign:'center'
    }


}));

function Seleccionar({micro,cantidadPasajero}) {
    const classes = useStyles();
    const [redirecciona,setRedirecciona] = React.useState(false);
    return(
        <div className={classes.seleccionar1}  >
            <Button className={classes.seleccionar} onClick={()=>setRedirecciona(true)} variant="outlined" color="primary"> SELECCIONAR</Button>
            {redirecciona && <Redirect  to={{ pathname: "/pasajero",state:{Micros: micro,cantidadPasajero:cantidadPasajero} }}/> }
        </div>
    );
}

const Tablehead = () => {
    const classes = useStyles();
    return (
        <TableHead className={classes.head}>
            <TableRow className={classes.rowHead}>
                <TableCell className={classes.headTh}>EMPRESA</TableCell>
                <TableCell className={classes.headTh}>HORA SALIDA</TableCell>
                <TableCell className={classes.headTh}>HORA LLEGADA</TableCell>
                <TableCell className={classes.headTh}>TIPO</TableCell>
                <TableCell className={classes.headTh}>SELECCIONAR</TableCell>
            </TableRow>
        </TableHead>
    );
};

function Tablebody({micro,cantidadPasajero}) {
    const classes = useStyles();

    const filas = micro.map((user,index)=>{
        return(
            <TableRow key={index}  className={classes.rowBody}> 
              <TableCell className={classes.bodyTd}><img src={user.empresa} width="100px" height="30px" alt=""/></TableCell>
              <TableCell className={classes.bodyTd}>{user.horaSalida}</TableCell>
              <TableCell className={classes.bodyTd}>{user.horaLlegada}</TableCell>
              <TableCell className={classes.bodyTd}>{user.tipo}</TableCell>
              <TableCell className={classes.bodyTd}><Seleccionar micro={micro[index]} cantidadPasajero={cantidadPasajero} /></TableCell>
            </TableRow>
        )}
    )

    return(<TableBody className={classes.body}>
            {filas}
        </TableBody>);
}

const TablaViaje = (props) => {
    const classes = useStyles();

    const {location} = props;
    const micros = location.state.Micros;
    const cantidadPasajero = location.state.cantidadPasajero;

    return (<div className={classes.root}>
                <TableContainer className={classes.tabla}  stickyHeader aria-label="sticky table">
                    {/* <Typography variant="h5" className={classes.title}>Viajes</Typography> */}
                    <Tablehead/>
                    <Tablebody micro={micros} cantidadPasajero={cantidadPasajero}/>
                </TableContainer>
            </div>
    );
};

export default withRouter(TablaViaje);