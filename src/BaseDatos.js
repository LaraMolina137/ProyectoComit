import {db} from "./firebase";

const micro1 = {
    // empresa: 'Plusmar', 
    // lugarSalida:'Paraguay',
    // lugarLlegada:'Argentina',
    // fechaSalida:'2021-01-15',
    // fechaLlegada:'2021-01-15',
    // horaSalida:'10:40',
    // horaLlegada:'16:00',
    // cantidadAsientos: 50,
    // tipo:'semicama'
    empresa: 'Rutamar', 
    lugarSalida:'Paraguay',
    lugarLlegada:'Argentina',
    fechaSalida:'2021-01-15',
    fechaLlegada:'2021-01-15',
    horaSalida:'10:40',
    horaLlegada:'16:00',
    cantidadAsientos: 1,
    tipo:'cama'
}

db.collection('micro').add(micro1)