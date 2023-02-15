import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { cambiarEmail, establecerAuthEmail, getDatorEmpleados, login } from "../Services/User-service";
import { RootState } from "./Index";
import UserSlice from "./User-slice";
import ResponseLoginType from "../Types/ResponseLoginType";
import UserLoginType from "../Types/UserLoginType";
import { NavigateFunction } from "react-router-dom";
import { logout, resetStates, SetCookiesSession, setPrimerLogin, setVerification } from "../Utils/SessionHandler";
import { setChange, setShowContent } from "./UI-actions";
import UserType from "../Types/UserType";
import { closeModal } from "./Submenu-actions";
import Swal from "sweetalert2";
import UISlice from "./UI-slice";


export const UserActions = UserSlice.actions;
const UIActions = UISlice.actions;

export const fetchUser = (userLogin: UserLoginType, navigate: NavigateFunction): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(UIActions.setLoginFormLoading(true));
        const response: ResponseLoginType | null = await login(userLogin);
        
        if(response === null){
            Swal.fire({icon: "error", text: "Ha ocurrido un error"});
            return;
        }
        
        if(response?.code === 1){
            SetCookiesSession(response.data!.empleadoId, response.data!.token, response.data!.expire)
            dispatch(setShowContent(true));
            dispatch(setChange(true));
            navigate("/");
        }else if(response?.code === 2){
            SetCookiesSession(response.data!.empleadoId, response.data!.token, response.data!.expire)
            dispatch(setShowContent(true));
            dispatch(setChange(true));
            setPrimerLogin(response!.data!.empleadoId);
            navigate("/login/CambiarClave");

        }else if(response?.code === 3){
            const datos = response!.data!;
            SetCookiesSession(response.data!.empleadoId, response.data!.token, response.data!.expire)
            dispatch(setShowContent(true));
            dispatch(setChange(true));
            setVerification({codigo: datos.verificacion!, cuil: datos.empleadoId});
            navigate("/login/Verificacion");
        }
        else if(response?.code === 0){
            Swal.fire({icon: "error", text: response.message!});
        }
        dispatch(UIActions.setLoginFormLoading(false));
    }
}

export const setUser = (id: string, navigate: NavigateFunction): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const response = await getDatorEmpleados(id);
        
        if(response === null){
            Swal.fire({icon: "error", text: "Ha ocurrido un error"});
            return;
        }

        if(response === 401){
            logout();
            resetStates(dispatch);
            navigate("/login");
            return;
        }

        if((typeof response !== "number")){
            if(response?.code === 1 ){
                const user: UserType =  response.data!;
                dispatch(UserActions.setUser(user))
            }
            else if(response?.code === 0){
                Swal.fire({icon: "error", text: response.message!});
            }
        }
    }
}

export const fetchCambiarEmail = (id: string, clave: string, email: string, navigate: NavigateFunction): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const response = await cambiarEmail(id, clave, email);
        
        if(response === null){
            Swal.fire({icon: "error", text: "Ha ocurrido un error"});
            dispatch(closeModal());
            return;
        }

        if(response === 401){
            logout();
            resetStates(dispatch);
            navigate("/login");
            return;
        }

        if((typeof response !== "number")){
            if(response?.code === 1 ){
                const user: string =  response.data!;
                dispatch(UserActions.setEmail(user));
                dispatch(closeModal());
                Swal.fire({
                    icon: "success",
                    text: response.message
                });
            }
            else if(response?.code === 0){
                Swal.fire({icon: "error", text: response.message!});
                dispatch(closeModal());
            }
        }
        
    }
}

export const fetchAuthEmail = (id: string, allow: number, navigate: NavigateFunction): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const response = await establecerAuthEmail(id, allow);
        
        if(response === null){
            Swal.fire({icon: "error", text: "Ha ocurrido un error"});
            dispatch(closeModal());
            return;
        }

        if(response === 401){
            logout();
            resetStates(dispatch);
            navigate("/login");
            return;
        }

        if((typeof response !== "number")){
            if(response?.code === 1 ){
                dispatch(UserActions.setAuthEmail(allow === 1));
                dispatch(closeModal());
                Swal.fire({
                    icon: "success",
                    text: response.message
                });
            }
            else if(response?.code === 0){
                Swal.fire({icon: "error", text: response.message!});
                dispatch(closeModal());
            }
        }
        
    }
}

export const resetState = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(UserActions.reset());
    }
}

