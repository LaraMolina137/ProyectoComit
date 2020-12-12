import React from 'react';
import {db} from "../firebase";

const Section = () => {

    function NuevaColeccion() {
        db.collection('micro').add({empresa: '',
                                    tipo:''
                                    })
    }

    function bd(params) {
        NuevaColeccion();
    }

    return (
        <section>
            <button onClick={bd}>Manejar Base de Datos</button>
        </section>
    );
};

export default Section;