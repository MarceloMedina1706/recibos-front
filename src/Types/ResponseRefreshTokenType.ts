import RefreshTokenType from "./RefreshTokenType";

type ResponseRefreshTokenType = {
    code: number,
    message: string | null,
    data: RefreshTokenType | null
}

export default ResponseRefreshTokenType;