import LiquidacionItemType from "./LiquidacionItemType";

type ResponseLiquidacionItemsType = {
    code: number;
    message: string | null;
    data: LiquidacionItemType[] | null;
}

export default ResponseLiquidacionItemsType;