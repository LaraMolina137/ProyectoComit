import React, {useState}from 'react';
//Estilos en Material UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
//icono de circulo
import AccountCircle from '@material-ui/icons/AccountCircle'; 
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
//Agregadas por mi
import Login from './Login'
import Signup from './Signup'
import Fab from '@material-ui/core/Fab';
import HomeIcon from '@material-ui/icons/Home';
import {Link,withRouter} from 'react-router-dom';

import InfoIcon from '@material-ui/icons/Info';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';
import '../styles/components/AppBar.css';

function Alert(props) {
  return <MuiAlert elevation={1000} variant="standard" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    paddingTop: theme.spacing(1)
  },
  imagen: {
    height: 50,
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  // inicioSesion:{
  //   marginRight: theme.spacing(1),
  // },
  casa:{
    boxShadow:'none'
  }
}));

export default withRouter(function MenuAppBar({location}) {
  const classes = useStyles();

  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [registra,setRegistra] = useState(false);

  const [open1, setOpen1] = React.useState(false);

  const handleClick = () => {
    setOpen1(true);
  };

  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen1(false);
  };


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <img className={classes.imagen} src="https://www.pngjoy.com/pngl/954/11057525_nube-kid-goku-iphone-x-transparent-png.png" alt=""/>
            <Typography variant="h4" className={classes.title}>Micro-Distance</Typography>
            <div>
                <Link to="/" 
                onClick={() => {
                  if(location.pathname === '/')
                  window.location.reload()}}
                >
                  <Fab variant="extended" color="primary" className={classes.casa}>
                    <HomeIcon />
                      Home
                  </Fab>
                </Link>
                
                {/* <IconButton
                    // aria-label="account of current user"
                    // aria-controls="menu-appbar"
                    // aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                  <Fab variant="extended" color="primary" className={classes.casa}>
                    <AccountCircle />
                  </Fab>
                </IconButton> */}
                

                {/* funcionalidad dentro del boton usuario */}
                {/* <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    {!registra?( 
                     <MenuItem ><Login setRegistra={setRegistra}/></MenuItem>) 
                   :(<MenuItem ><Signup setRegistra={setRegistra}/></MenuItem>)}

                </Menu> */}


                <IconButton
                    onClick={handleClick}
                    color="inherit"
                >
                  <Fab variant="extended" color="primary" className={classes.casa}>
                  {/* <Alerta/> */}
                      <InfoIcon />
                  </Fab>
                </IconButton>

                <Snackbar open={open1} onClose={handleClose1}>
                  <Alert onClose={handleClose1} severity="info">
                      {/* <AlertTitle>Info</AlertTitle> */}
                      {/* La informacion en la base de datos sobre los micros disponibles es reducida a fin de ser practico.<br/> */}
                      Para encontrar micros dejar los datos por default y variar las personas, la base de datos es limitada.
                      {/* Cualquier otro dato ingresado indicara que no hay micros. */}
                  </Alert>
                </Snackbar>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
 
)
