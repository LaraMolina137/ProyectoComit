import React from 'react';

function Deletebutton(props) {

    return(
        <div className="delete">
            <button onClick={()=>
                props.delete(props.usuario)
            }>
                Delete
            </button>
        </div>
    );
}

const Tablehead = () => {
    return (
        <thead className="Table">
            <tr>
                <th>Name</th>
                <th>Job</th>
                <th>Remove</th>
            </tr>
        </thead>
    );
};

function Tablebody(props) {
    // const filas=props.datoImput.map((user,index)=>{
    //     return(
    //         <tr key={index}> 
    //         <td>{user.nombre}</td>
    //         <td>{user.oficio}</td>
    //         <td><Deletebutton delete={props.delete} usuario={index}/></td>
    //     </tr>
    //     )}
    // )

    // return(<tbody>
    //     {filas}
    // </tbody>);
}

const TablaViaje = (props) => {
    return (
            <table>
              <Tablehead/>
              {/* <Tablebody datoImput={props.datosInput} delete={props.deleteUser}/> */}
            </table>
        
    );
};

export default TablaViaje;