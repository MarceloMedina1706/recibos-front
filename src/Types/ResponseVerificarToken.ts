import UserRecuperado from "./UserRecuperadoType";

type ResponseVerificarTokenType = {
    code: number;
    message: string | null;
    data: UserRecuperado | null;
}

export default ResponseVerificarTokenType;