import TipoLiquidacionType from "./TipoLiquidacionType"

type ResponseTipoLiquidacionType = {
    code: number,
    message: string,
    data: TipoLiquidacionType[]
}

export default ResponseTipoLiquidacionType;