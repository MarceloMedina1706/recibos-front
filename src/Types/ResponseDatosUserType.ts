type DataResponseDatosUserType = {
    nombre: string;
    apellido: string;
    cuil: string;
    mail: string;
    role: string;
    empresa: string;
    authEmail: boolean;
    sinFirmar: number;
}

type ResponseDatosUserType = {
    code: number;
    message: string | null;
    data: DataResponseDatosUserType | null;
}

export default ResponseDatosUserType;