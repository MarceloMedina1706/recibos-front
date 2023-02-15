export const isClaveValid = (enteredClave: string, enteredClaveRep: string, setClaveNuevaError: any, setClavenuevaRepError: any ) => {
    const valid = arePasswordsValid(enteredClave, enteredClaveRep);
  if (valid.length > 1 && valid[0].codigo !== 7) {
    setClaveNuevaError(valid[0].mensaje);
    setClavenuevaRepError(valid[1].mensaje);
    return false;
  } else if (valid.length > 1 && valid[0].codigo === 7) {
    setClaveNuevaError(valid[1].mensaje);
    setClavenuevaRepError(valid[1].mensaje);
    return false;
  } else if (valid.length === 1 && valid[0].codigo !== 7) {
    setClaveNuevaError(valid[0].mensaje);
    setClavenuevaRepError(valid[0].mensaje);
    return false;
  } else if (valid.length === 1 && valid[0].codigo === 7) {
    setClaveNuevaError(null);
    setClavenuevaRepError(null);
    return true;
  }
};

const arePasswordsValid = (pass: string, matchPass: string) => {
  let response = [];
  if (pass.length < 8) {
    response = [
      {
        codigo: 1,
        mensaje: "La clave debe tener como mínimo 8 caracteres.",
      },
    ];
  } else if (!/[a-z]/.test(pass)) {
    response = [
      {
        codigo: 2,
        mensaje: "La clave debe tener al menos 1 minúscula.",
      },
    ];
  } else if (!/[A-Z]/.test(pass)) {
    response = [
      {
        codigo: 3,
        mensaje: "La clave debe tener al menos 1 mayúscula.",
      },
    ];
  } else if (!/[0-9]/.test(pass)) {
    response = [
      {
        codigo: 4,
        mensaje: "La clave debe tener al menos 1 numero.",
      },
    ];
  } else if (!/[^a-zA-Z0-9]/.test(pass)) {
    response = [
      {
        codigo: 5,
        mensaje: "La clave debe tener al menos 1 carácter especial.",
      },
    ];
  } else {
    response = [
      {
        codigo: 7,
        mensaje: "",
      },
    ];
  }

  if (pass !== matchPass) {
    response = [
      ...response,
      { codigo: 6, mensaje: "Las claves no coinciden." },
    ];
  }

  return response;
};
