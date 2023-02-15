import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import DatosLiquisType from "../Types/DatosLiquisType";
import LiquidacionItemType from "../Types/LiquidacionItemType";
import LiquidacionType from "../Types/LiquidacionType";

type LiquidacionSliceType = {
  liquidacionItems: LiquidacionItemType[];
  liquidacion: LiquidacionType | null;
  liquidaciones: DatosLiquisType[] | null;
  itemActive: number;
  change: boolean;
};
const initialState: LiquidacionSliceType = {
  liquidacionItems: [],
  liquidacion: null,
  liquidaciones: null,
  itemActive: 0,
  change: true,
};

const LiquidacionSlice = createSlice({
  name: "liquidacion",
  initialState: initialState,
  reducers: {
    setLiquidacionItems(state, action: PayloadAction<LiquidacionItemType[]>) {
      state.liquidacionItems = action.payload;
    },
    setLiquidacion(state, action: PayloadAction<LiquidacionType>) {
      state.liquidacion = action.payload;
    },
    setLiquidacionNull(state) {
      state.liquidacion = null;
    },
    setItemActive(state, action: PayloadAction<number>) {
      state.itemActive = action.payload;
    },
    setChange(state, action: PayloadAction<boolean>) {
      state.change = action.payload;
      //console.log("SLICE: " + state.change)
    },
    setLiquidaciones(state, action: PayloadAction<DatosLiquisType[]>){
      state.liquidaciones = action.payload;
    },
    resetLiquidacionState(state) {
      state.liquidacionItems = [];
      state.liquidacion = null;
      state.liquidaciones = null;
      state.itemActive = 0;
      state.change = true;
    },
  },
});

export default LiquidacionSlice;
