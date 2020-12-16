import React from 'react';
import {withRouter, Redirect} from 'react-router-dom';
// import Button from '@material-ui/core/Button/Button';

function Seleccionar({micro}) {

    const [redirecciona,setRedirecciona] = React.useState(false);

    return(
        <div className="seleccionar">
            <button onClick={()=>setRedirecciona(true)} >
               Seleccionar
            </button>
            {redirecciona && <Redirect  to={{ pathname: "/pasajero",state:{Micros: micro} }}/> }
        </div>
    );
}

const Tablehead = () => {
    return (
        <thead className="Table">
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

    const {location} = props;
    const micros = location.state.Micros;

    return (<div>
                <h3>Viajes</h3>
                <table>
                    <Tablehead/>
                    <Tablebody micro={micros}/>
                </table>
            </div>
    );
};

export default withRouter(TablaViaje);