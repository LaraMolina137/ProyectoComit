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
  inicioSesion:{
    marginRight: theme.spacing(1),
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();

  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [registra,setRegistra] = useState(false);


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
                {/* funcionalidad del boton usuario */}
                <IconButton
                    // aria-label="account of current user"
                    // aria-controls="menu-appbar"
                    // aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <Typography variant="h6" className={classes.inicioSesion}>Iniciar Sesion</Typography>
                    <AccountCircle />
                </IconButton>

                {/* funcionalidad dentro del boton usuario */}
                <Menu
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

                </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
 

