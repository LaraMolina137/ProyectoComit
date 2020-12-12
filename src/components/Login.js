import React from 'react';
import {Container, Grid, FormControl,InputLabel, Input, FormHelperText, Button} from '@material-ui/core';
import {authentication} from "../firebase";

export default function Login({setRegistra}) {

  // const [email,setEmail] = useState('');
  // const [password,setPassword] = useState('');

  const iniciarSesion = async e => {
        e.preventDefault();
        const { email, password } = e.target.elements;

        await authentication
            .signInWithEmailAndPassword(email.value, password.value)
            .then(result => {
                console.log(result);
                alert('Usuario Inicio sesion');

            })
            .catch(error => {
                alert(error)
            });
        
    };



  return ( 
    <Container>
      <h3>Inicia Sesion o Registrate</h3>
      <form onSubmit={iniciarSesion}>
        <Grid item md={12}>
          <FormControl>
              <InputLabel htmlFor="email">Correo Electronico</InputLabel>
              <Input id="email" type="email"  name="email" />
              <FormHelperText id="my-helper-text"></FormHelperText>
          </FormControl>
        </Grid>
        <Grid item md={12}>
          <FormControl>
              <InputLabel htmlFor="password">Contraseña</InputLabel>
              <Input id="password" type="password"  name="password" />
              <FormHelperText id="my-helper-text">¿Olvidaste tu contraseña?</FormHelperText>
          </FormControl>
        </Grid>
        <br/>
        <Grid item md={12}>
          <Button variant="contained" color="primary" type="submit" >Iniciar Sesion</Button>
        </Grid>
        <br/>
        <Grid item md={12}>
          <Button variant="contained" color="primary" onClick={()=>setRegistra(true)}>Registrate  </Button>
        </Grid>
      </form>
    </Container>
  );
}
