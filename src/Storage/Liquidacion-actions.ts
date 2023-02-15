import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchLiquidaciones, firmarRecibo, getLiquidacion, getLiquidacionItems } from "../Services/Liquidacion-service";
import { logout, resetStates } from "../Utils/SessionHandler";
import { RootState } from "./Index";
import LiquidacionSlice from "./Liquidacion-slice";
import UserSlice from "./User-slice";

export const liquidacionActions = LiquidacionSlice.actions;
const userActions = UserSlice.actions;

export const fetchLiquidacionItems = (empleadoId: string, navigate: NavigateFunction): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const response = await getLiquidacionItems(empleadoId);

        if(response === null){
            Swal.fire({icon: "error", text: "Ha ocurrido un error"});
            return;
        }

        if(response === 401){
            logout();
            resetStates(dispatch);
            navigate("/login");
            return;
      

        }else if((typeof response !== "number")){
            if(response?.code === 1){
            
                dispatch(liquidacionActions.setLiquidacionItems(response.data!));
            }
            else if(response!.code === 0){
                Swal.fire({icon: "error", text: response.message!});
            }
        }

       
    }
}

export const fetchLiquidacion = (empleadoId: string, liquiId: number, navigate: NavigateFunction): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const response = await getLiquidacion(empleadoId, liquiId);
        if(response === null){
            Swal.fire({icon: "error", text: "Ha ocurrido un error"});
            return;
        }
        
        if(response === 401){

            logout();
            resetStates(dispatch);
            navigate("/login");
            return;

        }else if((typeof response !== "number")){
            if(response!.code === 1 || response!.code === 2){
                dispatch(liquidacionActions.setLiquidacion(response.data!));
                if(response!.code === 2) dispatch(liquidacionActions.setChange(true))
            }else if(response!.code === 3){
                Swal.fire({icon: "info", text: response.message!});
            }
            else if(response!.code === 0){
                Swal.fire({icon: "error", text: response.message!});
            }
        }
    }
}

export const fetchFirma = (empleadoId: string, clave: string, liquiId: number, navigate: NavigateFunction): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const response = await firmarRecibo(empleadoId, clave, liquiId);

        if(response === 401){
            logout();
            resetStates(dispatch);
            navigate("/login");
            return;
        }

        if(response === null){
            Swal.fire({icon: "error", text: "Ha ocurrido un error"});
            return;
        }
        
        if((typeof response !== "number")){
            if(response!.code === 1 ){
                dispatch(liquidacionActions.setChange(true))
                dispatch(userActions.decrementSinFirma());
            }
            else if(response!.code === 0){
                Swal.fire({icon: "error", text: response.message!});
            }
        }
    }
}

export const fetchLiquidacionesEmpleado = (empleadoId: string, navigate: NavigateFunction): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const response = await fetchLiquidaciones(empleadoId);
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
            if(response!.code === 1){
                dispatch(liquidacionActions.setLiquidaciones(response.data!));
            }
            else if(response!.code === 0){
                Swal.fire({icon: "error", text: response.message!});
            }
        }
    }
}



export const setLiquidacionNull = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(liquidacionActions.setLiquidacionNull());
    }
}

export const setChange = (change: boolean): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(liquidacionActions.setChange(change));
    }
}

export const setItemActive = (liquiId: number): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(liquidacionActions.setItemActive(liquiId));
    }
}

export const resetLiquidacionState = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(liquidacionActions.resetLiquidacionState());
    }
}