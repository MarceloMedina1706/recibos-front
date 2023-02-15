import DatosLiquisType from "./DatosLiquisType";

type ResponseObtLiquis = {
    code: number;
    message: string | null;
    data: DatosLiquisType[] | null;
}

export default ResponseObtLiquis;