import React from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { border } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(40),
        marginRight: theme.spacing(40),
        marginTop: theme.spacing(10),
        padding: theme.spacing(2),
        borderColor:'black',
        border:'1px solid',
    },
    head: {

    }

}));

function Seleccionar({micro}) {
    const [redirecciona,setRedirecciona] = React.useState(false);
    return(
        <div className="seleccionar">
            <button onClick={()=>setRedirecciona(true)}> Seleccionar</button>
            {redirecciona && <Redirect  to={{ pathname: "/pasajero",state:{Micros: micro} }}/> }
        </div>
    );
}

const Tablehead = () => {
    const classes = useStyles();
    return (
        <thead className={classes.head}>
            <tr>
                <th>Empresa</th>
                <th>Hora Salida</th>
                <th>Hora Llegada</th>
                <th>Tipo</th>
                <th>Seleccionar</th>
            </tr>
        </thead>
    );
};

function Tablebody({micro}) {
    const filas = micro.map((user,index)=>{
        return(
            <tr key={index}> 
              <td>{user.empresa}</td>
              <td>{user.horaSalida}</td>
              <td>{user.horaLlegada}</td>
              <td>{user.tipo}</td>
              <td><Seleccionar micro={micro}/></td>
            </tr>
        )}
    )

    return(<tbody>
        {filas}
    </tbody>);
}

const TablaViaje = (props) => {
    const classes = useStyles();

    const {location} = props;
    const micros = location.state.Micros;

    return (<div className={classes.root}>
                <h3>Viajes</h3>
                <table>
                    <Tablehead/>
                    <Tablebody micro={micros}/>
                </table>
            </div>
    );
};

export default withRouter(TablaViaje);