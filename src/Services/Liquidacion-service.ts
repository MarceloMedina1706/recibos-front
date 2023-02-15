import { urlEliminarLiquidacion, urlFirmarRecibo, urlGetEmpleadosLiquidacion, urlGetItemsLiquidaciones, urlGetLiquidacion, urlGetLiquidaciones, urlGetLiquidacionEspecifica, urlObtenerLiquis } from "../Endpoints";
import ResponseEmpLiquiType from "../Types/ResponseEmpLiquiType";
import ResponseLiquidacionItemsType from "../Types/ResponseLiquidacionItemsType";
import ResponseLiquidacionType from "../Types/ResponseLiquidacionType";
import ResponseLiquiEspType from "../Types/ResponseLiquiEspType";
import ResponseObtLiquis from "../Types/ResponseObtLiquis";
import { GetItems, verificarToken } from "../Utils/SessionHandler";

export const getLiquidacionItems = async (id: string) => {
    let sw = 0;
    const token = GetItems().token;
    const response = await fetch(`${urlGetItemsLiquidaciones}/${id}`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    }).catch(() => { sw = 1; });

    if(response?.status === 401){
        const res: number = 401;
        return res;
    }

    if(sw === 1 || !response?.ok) return null;
    
    const data: ResponseLiquidacionItemsType = await response!.json();
    return data;
}

export const getLiquidacion = async (id: string, liquiId: number) => {
    let sw = 0;
    
    verificarToken();
    const token = GetItems().token;
    const response = await fetch(`${urlGetLiquidacion}/${id}/${liquiId}`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    }).catch(() => { sw = 1; });
    
    if(response?.status === 401){
        const res: number = 401;
        return res;
    }

    if(sw === 1 || !response?.ok) return null;
    
    const data: ResponseLiquidacionType = await response!.json();
    return data;
}

export const getLiquidaciones = async (id: string, liquiId: number[]) => {
    let sw = 0;
    
    const token = GetItems().token;
    const json = {
        EmpleadoId: id,
        LiquiId: liquiId
    }


    const response = await fetch(`${urlGetLiquidaciones}`, {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "Application/Json"
        },
        body: JSON.stringify(json)
    }).catch(() => { sw = 1; });

    if(response?.status === 401){
        const res: number = 401;
        return res;
    }
    
    if(sw === 1 || !response?.ok) return null;
    
    const data = await response!.json();
    return data;
}

export const firmarRecibo = async (id: string, clave: string, liquiId: number) => {
    let sw = 0;
    
    const token = GetItems().token;
    const response = await fetch(`${urlFirmarRecibo}/${id}/${clave}/${liquiId}`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    }).catch(() => { sw = 1; });

    if(response?.status === 401){
        const res: number = 401;
        return res;
    }
    
    if(sw === 1 || !response?.ok) return null;
    
    const data: ResponseLiquidacionType = await response!.json();
    return data;
}

export const fetchLiquidaciones = async (id: string) => {
    let sw = 0;
    
    const token = GetItems().token;
    const response = await fetch(`${urlObtenerLiquis}/${id}`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    }).catch(() => { sw = 1; });

    if(response?.status === 401){
        const res: number = 401;
        return res;
    }
    
    if(sw === 1 || !response?.ok) return null;
    
    const data: ResponseObtLiquis = await response!.json();
    return data;
}

export const fetchEmpleadosLiquidacion = async (id: string, liquiId: number) => {
    let sw = 0;
    const json = {
        userId: id,
        liquiId
    }
    const token = GetItems().token;
    const response = await fetch(`${urlGetEmpleadosLiquidacion}`, {
        method: "POST",
        headers: {
            "Content-Type": "Application/Json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(json)
    }).catch(() => { sw = 1; });

    if(response?.status === 401){
        const res: number = 401;
        return res;
    }
    
    if(sw === 1 || !response?.ok) return null;
    
    const data: ResponseEmpLiquiType = await response!.json();
    return data;
}

export const fetchLiquidacionEspecifica = async (id: string, empleado: string, liquiId: number) => {
    let sw = 0;
    const json = {
        userId: id,
        liquiId,
        empleadoId: empleado
    }
    const token = GetItems().token;
    const response = await fetch(`${urlGetLiquidacionEspecifica}`, {
        method: "POST",
        headers: {
            "Content-Type": "Application/Json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(json)
    }).catch(() => { sw = 1; });

    if(response?.status === 401){
        const res: number = 401;
        return res;
    }
    
    if(sw === 1 || !response?.ok) return null;
    
    const data: ResponseLiquiEspType = await response!.json();
    return data;
}

export const generarEmpties = (cantidad: number) => {
    let array = [];
    for(let i=0; i<cantidad; i++){
      array[i] = ["", "", "", "", ""];
    }
    return array;
}

export const eliminarLiquidacion = async (liquiId: number) => {
    let sw = 0;
    const token = GetItems().token;
    const response = await fetch(`${urlEliminarLiquidacion}/${liquiId}`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    }).catch(() => { sw = 1; });

    if(response?.status === 401){
        const res: number = 401;
        return res;
    }
    
    if(sw === 1 || !response?.ok) return null;
    
    const data: ResponseLiquiEspType = await response!.json();
    return data;
}
