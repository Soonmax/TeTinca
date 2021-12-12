import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import memoriesLogo from '../../images/Logo.png';
import memoriesText from '../../images/Text.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  const deleteUser = (user) => {
    dispatch({ type: actionType.DELETE_U });
    //console.log(user);
    //history.push('/auth');
    //user = null;

  };



  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      console.log(user?.result._id);

      if (decodedToken.exp * 1000 < new Date().getTime());
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
        <img className={classes.image} src={memoriesLogo} alt="icon" height="50px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>

            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Cerrar Sesión</Button>
            <Button variant="contained" className={classes.deleteUser} color="secondary" onClick={deleteUser}>BORRAR</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Iniciar Sesión</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
