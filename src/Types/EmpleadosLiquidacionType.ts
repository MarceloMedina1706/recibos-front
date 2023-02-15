import CodigoLiquidacionType from "./CodigoLiquidacionType";

type EmpleadosLiquidacionType = {
  empleadoId: string;
  totalHaberes: string;
  totalDeducciones: string;
  totalNeto: string;
  cantCodigos: number;
  categoria: string;
  descripcion: string;
  sueldoBasico: string;
  fecUltDep: string;
  banco: string;
  codigoLiquidaciones: CodigoLiquidacionType[] | null
};

export default EmpleadosLiquidacionType;
