import {
  urlCambiarClave,
  urlCambiarEmail,
  urlDatosEmpleados,
  urlEstablecesAuthEmail,
  urlLogin,
  urlRecuperarClave,
  urlReestablecerClave,
  urlRefreshToken,
  urlVerificarToken,
} from "../Endpoints";
import ResponseAuthEmailType from "../Types/ResponseAuthEmailType";
import ResponseCambiarClaveType from "../Types/ResponseCambiarClaveType";
import ResponseCambiarEmailType from "../Types/ResponseCambiarEmailType";
import ResponseDatosUserType from "../Types/ResponseDatosUserType";
import ResponseLoginType from "../Types/ResponseLoginType";
import ResponseRecuperarType from "../Types/ResponseRecuperarType";
import ResponseReestablecerClaveType from "../Types/ResponseReestablecerClaveType";
import ResponseRefreshTokenType from "../Types/ResponseRefreshTokenType";
import ResponseVerificarTokenType from "../Types/ResponseVerificarToken";
import UserLoginType from "../Types/UserLoginType";
import { GetItems } from "../Utils/SessionHandler";

export const login = async (userLogin: UserLoginType) => {
  let sw = 0;
  const response = await fetch(urlLogin, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({ mail: userLogin.mail, clave: userLogin.clave }),
  }).catch(() => {
    sw = 1;
  });

  if (sw === 1 || !response?.ok) return null;

  const data: ResponseLoginType = await response?.json();

  return data;
};

export const getDatorEmpleados = async (id: string) => {
  let sw = 0;
  const token = GetItems().token;
  const response = await fetch(`${urlDatosEmpleados}/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  }).catch(() => {
    sw = 1;
  });

  if (response?.status === 401) {
    const res: number = 401;
    return res;
  }

  if (sw === 1 || !response?.ok) return null;

  const data: ResponseDatosUserType = await response?.json();

  return data;
};

export const sendDataRecupero = async (email: string, cuil: string) => {
  let sw = 0;
  const json = {
    email,
    cuil,
  };

  const response = await fetch(`${urlRecuperarClave}`, {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify(json),
  }).catch(() => {
    sw = 1;
  });

  if (sw === 1 || !response?.ok) return null;

  const data: ResponseRecuperarType = await response?.json();

  return data;
};

export const verificarTokenRecuperacion = async (token: string) => {
  let sw = 0;

  const response = await fetch(`${urlVerificarToken}/${token}`).catch(() => {
    sw = 1;
  });

  if (sw === 1 || !response?.ok) return null;

  const data: ResponseVerificarTokenType = await response?.json();

  return data;
};

export const reestablecerClave = async (
  tokenId: number,
  empleadoId: string,
  clave: string
) => {
  let sw = 0;

  const json = {
    tokenId,
    empleadoId,
    clave,
  };
  const response = await fetch(`${urlReestablecerClave}`, {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify(json),
  }).catch(() => {
    sw = 1;
  });

  if (sw === 1 || !response?.ok) return null;

  const data: ResponseReestablecerClaveType = await response?.json();

  return data;
};

export const cambiarClave = async (
  empleado: string,
  clave: string,
  claveNueva: string,
  primerLogin: boolean
) => {
  let sw = 0;
  const token = GetItems().token;

  const json = {
    empleado,
    clave,
    claveNueva,
    primerLogin
  };
  const response = await fetch(`${urlCambiarClave}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-type": "Application/json",
    },
    body: JSON.stringify(json),
  }).catch(() => {
    sw = 1;
  });

  if (response?.status === 401) {
    const res: number = 401;
    return res;
  }

  if (sw === 1 || !response?.ok) return null;

  const data: ResponseCambiarClaveType = await response?.json();

  return data;
};

export const cambiarEmail = async (
  empleado: string,
  clave: string,
  emailNuevo: string
) => {
  let sw = 0;
  const token = GetItems().token;

  const json = {
    empleado,
    clave,
    emailNuevo
  };
  const response = await fetch(`${urlCambiarEmail}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-type": "Application/json",
    },
    body: JSON.stringify(json),
  }).catch(() => {
    sw = 1;
  });

  if (response?.status === 401) {
    const res: number = 401;
    return res;
  }

  if (sw === 1 || !response?.ok) return null;

  const data: ResponseCambiarEmailType = await response?.json();

  return data;
};

export const establecerAuthEmail = async (
  empleado: string,
  allow: number
) => {
  let sw = 0;
  const token = GetItems().token;

  const json = {
    cuil: empleado,
    authEmail: allow === 1
  };

  const response = await fetch(`${urlEstablecesAuthEmail}`, {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(json),
  }).catch(() => {
    sw = 1;
  });

  if (response?.status === 401) {
    const res: number = 401;
    return res;
  }

  if (sw === 1 || !response?.ok) return null;

  const data: ResponseAuthEmailType = await response?.json();

  return data;
};

export const fetchRefreshToken = async () => {
  let sw = 0;
  const token = GetItems().token;
  
  const response = await fetch(`${urlRefreshToken}/${token}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  }).catch(() => {
    sw = 1;
  });

  if (sw === 1 || !response?.ok) return null;

  const data: ResponseRefreshTokenType = await response?.json();
  

  return data;
}