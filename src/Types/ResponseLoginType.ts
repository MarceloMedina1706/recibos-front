type DataResponseLoginType = {
    token: string;
    expire: string;
    empleadoId: string;
    verificacion: string | null;
}

type ResponseLoginType = {
    code: number;
    message: string | null;
    data: DataResponseLoginType | null;
}

export default ResponseLoginType;