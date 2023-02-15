import EmpleadosLiquidacionType from "./EmpleadosLiquidacionType";

type ResponseLiquiEspType = {
    code: number;
    message: string | null;
    data: EmpleadosLiquidacionType | null;
}

export default ResponseLiquiEspType;