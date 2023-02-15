import Swal from "sweetalert2";
import { urlAgregarTipoLiquidacion, urlEditarTipoLiquidacion, urlEliminarTipoLiquidacion, urlGetTipoLiquidacion } from "../Endpoints";
import ResponseTipoLiquidacionType from "../Types/ResponseTipoLiquidacionType";

import TipoLiquidacionType from "../Types/TipoLiquidacionType";
import { GetItems } from "../Utils/SessionHandler";

export const fetchTipoLiquidacion = async () => {
    let sw = 0;
    
    const token = GetItems().token;
    const response = await fetch(`${urlGetTipoLiquidacion}`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    }).catch(() => { sw = 1; });
    
    if(response?.status === 401){
        return 401;
    }

    if(sw === 1 || !response?.ok){
        Swal.fire({icon: "error", text: "Ha ocurrido un error en la petición."});
        const res: TipoLiquidacionType[] = [];
        return res;
    }
    
    const data: ResponseTipoLiquidacionType = await response!.json();
    if(data.code === 1){
        return data.data;
    }else{
        Swal.fire({icon: "error", text: data.message!});
        const res: TipoLiquidacionType[] = [];
        return res;
    }
}

export const fetchAgregarTipoLiquidacion = async (json: TipoLiquidacionType) => {
    let sw = 0;
    
    const token = GetItems().token;
    const response = await fetch(`${urlAgregarTipoLiquidacion}`, {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(json)
    }).catch(() => { sw = 1; });

    if(response?.status === 401){
        return 401;
    }
    
    if(sw === 1 || !response?.ok){
        Swal.fire({icon: "error", text: "Ha ocurrido un error en la petición."});
        return false;
    }
    
    const data: ResponseTipoLiquidacionType = await response!.json();
    if(data.code === 1){
        return true;
    }else{
        Swal.fire({icon: "error", text: data.message!});
        return false;
    }
}

export const fetchEditarTipoLiquidacion = async (json: TipoLiquidacionType) => {
    let sw = 0;
    
    const token = GetItems().token;
    const response = await fetch(`${urlEditarTipoLiquidacion}`, {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(json)
    }).catch(() => { sw = 1; });

    if(response?.status === 401){
        return 401;
    }
    
    if(sw === 1 || !response?.ok){
        Swal.fire({icon: "error", text: "Ha ocurrido un error en la petición."});
        return false;
    }
    
    const data: ResponseTipoLiquidacionType = await response!.json();
    if(data.code === 1){
        return true;
    }else{
        Swal.fire({icon: "error", text: data.message!});
        return false;
    }
}

export const fetchEliminarTipoLiquidacion = async (idTipoLiquidacion: number) => {
    let sw = 0;
    
    const token = GetItems().token;
    const response = await fetch(`${urlEliminarTipoLiquidacion}/${idTipoLiquidacion}`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    }).catch(() => { sw = 1; });

    if(response?.status === 401){
        return 401;
    }
    
    if(sw === 1 || !response?.ok){
        Swal.fire({icon: "error", text: "Ha ocurrido un error en la petición."});
        return false;
    }
    
    const data: ResponseTipoLiquidacionType = await response!.json();
    if(data.code === 1){
        return true;
    }else{
        Swal.fire({icon: "error", text: data.message!});
        return false;
    }
}