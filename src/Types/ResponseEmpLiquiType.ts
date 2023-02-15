import EmpleadosLiquidacionType from "./EmpleadosLiquidacionType";

type ResponseEmpLiquiType = {
    code: number;
    message: string | null;
    data: EmpleadosLiquidacionType[] | null;
}

export default ResponseEmpLiquiType;