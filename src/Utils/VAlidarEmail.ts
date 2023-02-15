export const isEmailValid = (
  enteredCorreoNuevo: string,
  enteredClave: string,
  setEmailError: any,
  setClaveError: any
) => {
  const emailValid = isValid(enteredCorreoNuevo);
  let formValid = {
    email: false,
    clave: false,
  };
  if (emailValid.codigo === 2) {
    setEmailError(emailValid.mensaje);
    formValid.email = false;
  } else {
    setEmailError(null);
    formValid.email = true;
  }

  if (enteredClave.trim().length === 0) {
    setClaveError("Debe ingresar su clave.");
    formValid.clave = false;
  } else {
    setClaveError(null);
    formValid.clave = true;
  }

  if((!formValid.email) || (!formValid.clave)) return false;
  else return true;
};

const isValid = (email: string) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailRegex.test(email)) {
    return {
      codigo: 1,
      mensaje: "",
    };
  } else {
    return {
      codigo: 2,
      mensaje: "Ingrese un email valido.",
    };
  }
};
