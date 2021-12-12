import { DELETE, AUTH } from '../constants/actionTypes';

import * as api from '../api/index.js';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {

    console.log(error);
    var textoerror;
    if (error = "Request failed with status code 405") {
      textoerror = "El nombre posee Números";
    }
    if (error = "Request failed with status code 406") {
      textoerror = "El apellido posee Números";
    }
    if (error = "Request failed with status code 407") {
      textoerror = "Los usuarios deben tener más de 16 años";
    }
    if (error = "Request failed with status code 400") {
      textoerror = "El correo ya está registrado";
    }
    MySwal.fire({

      icon: 'error',
      title: 'Oops...',
      text: textoerror,
    })
  }
};


