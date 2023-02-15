import { NavigateFunction } from "react-router-dom";
import { ThunkActionDispatch } from "redux-thunk";
import Swal from "sweetalert2";
import Cookies from "universal-cookie"
import { fetchRefreshToken } from "../Services/User-service";
import { resetLiquidacionState } from "../Storage/Liquidacion-actions";
import { resetSubmenuState } from "../Storage/Submenu-actions";
import { resetUIState } from "../Storage/UI-actions";
import { resetState } from "../Storage/User-actions";

const cookies = new Cookies();
const expiration = process.env.REACT_APP_MINUTES_EXPIRATION_SESSION;
const minutesExpiration = expiration ? +expiration : 30;
const paramsCookie = {path: "http://localhost:3000/"};

export const SetCookiesSession = (EmpleadoId: string, token: string, expire: string) => {
    RemoveAllCookie();
    cookies.set("id", EmpleadoId, paramsCookie);
    cookies.set("token", token, paramsCookie);
    cookies.set("expires", expire, paramsCookie);
    cookies.set("clientExpire", setExpirationTime(minutesExpiration), paramsCookie);
}

export const GetItems = () => {
    return {
        cuil: cookies.get("id"),
        token: cookies.get("token"),
        expires: cookies.get("expires"),
        clientExpires: cookies.get("clientExpire")
    }
}

export const checkLog = (navigate: NavigateFunction) => {
    if(!IsLogged()){
        navigate("/login");
        return false;
    }else{

        return true;
    }
}

export const IsLogged = () => {
    if(cookies.get("id") == null  || isExpired()){
        RemoveAllCookie();
        return false;
    }
    cookies.remove("clientExpire");
    cookies.set("clientExpire", setExpirationTime(minutesExpiration), paramsCookie);
    return true;
}

export const resetStates = (dispatch: ThunkActionDispatch<any>) => {
    dispatch(resetState());
    dispatch(resetUIState());
    dispatch(resetSubmenuState());
    dispatch(resetLiquidacionState());
};

export const verificarToken = () => {
    const expires = +cookies.get("expires");
    const dateExpires = new Date(expires).getTime();
    const now = new Date().getTime();
    const skew = dateExpires - now;
    if(skew > 0 && skew < (1000 * 60 * 2)){

        const refresh = async () => {
            const response = await fetchRefreshToken();
            if(!response){
                Swal.fire({
                    icon: "error",
                    text: "Ha ocurrido un error"
                });
                return;
            }
            if(response.code === 0){
                Swal.fire({
                    icon: "error",
                    text: response?.message!
                });
                return;
            }else if(response.code === 1){
                cookies.remove("token");
                cookies.remove("expires");
                cookies.set("token", response.data?.token, paramsCookie);
                cookies.set("expires", response.data?.expires, paramsCookie);
                return;
            }
        }

        refresh();
    }
}

export const logout = () => {
    RemoveAllCookie();
}


// P R I M E R     L O G I N    ==============================================================
export const setPrimerLogin = (cuil: string) => {
    cookies.set("primerLoginCuil", cuil, paramsCookie);
    cookies.set("primerLogin", true, paramsCookie);
}

export const getPrimerLogin = () => {
    return cookies.get("primerLoginCuil")
}

export const removePrimerLogin = () => {
    cookies.remove("primerLoginCuil");
    cookies.remove("primerLogin");
}
//F I N      P R I M E R     L O G I N    ==============================================================


// V E R I F I C A C I O N ==============================================================================

export const setVerification = (data: any) => {
    cookies.set("codigo", data.codigo, paramsCookie);
    cookies.set("tempCuil", data.cuil, paramsCookie);
}

export const getVerification = () => {
    return {
        codigo: cookies.get("codigo"),
        cuil: cookies.get("tempCuil")
    }
}

export const removeVerification = () => {
    cookies.remove("codigo");
    cookies.remove("tempCuil");
}

// F I N     V E R I F I C A C I O N ==============================================================================




const RemoveAllCookie = () => {
    cookies.remove("id");
    cookies.remove("token");
    cookies.remove("expires");
    cookies.remove("clientExpire");
}

const setExpirationTime = (minutes: number) =>{
    return new Date().getTime() + 1000 * 60 * minutes;
}

const isExpired = () => {
    return cookies.get("clientExpire") < new Date().getTime();
}