import React ,{useState}from 'react';
import {Container, Grid, FormControl,InputLabel, Input, Button} from '@material-ui/core';
import {authentication} from "../firebase";

const Signup = ({setRegistra}) => {

    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');

    function handleSignUp(e) {
                e.preventDefault();
                authentication.createUserWithEmailAndPassword(email, pass)
                .then((res)=>{
                    alert('Usuario Registrado')
                    console.log(res)
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // [START_EXCLUDE]
                    if (errorCode === 'auth/weak-password') {
                      alert('The password is too weak.');
                    } else {
                      alert(errorMessage);
                    }
                    console.log(error);
                    // [END_EXCLUDE]
                  });
    }


    return (
            <Container>
                <h3>Registrate</h3>

                <form onSubmit={handleSignUp}>
                    <Grid item md={12}>
                        <FormControl>
                            <InputLabel htmlFor="email">Correo Electronico</InputLabel>
                            <Input id="email" type="email" name="email" onChange={(e)=>setEmail(e.target.value)}/>
                        </FormControl>
                    </Grid>
                    <Grid item md={12}>
                        <FormControl>
                            <InputLabel htmlFor="password">Contraseña</InputLabel>
                            <Input id="password" type="password" name="password" onChange={(e)=>setPass(e.target.value)}/>
                        </FormControl>
                    </Grid>
                    <br/>
                    <Grid item md={12}>
                        <Button variant="contained" color="primary" type="submit">Registrate</Button>
                    </Grid>
                    <br/>
                    <Grid item md={12}>
                        <Button variant="contained" color="primary" onClick={()=>setRegistra(false)} >Atras</Button>
                    </Grid>
                </form>
        </Container>
    );
};


export default Signup;