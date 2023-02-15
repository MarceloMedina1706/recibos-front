import CodigoLiquidacionType from "./CodigoLiquidacionType";

type LiquidacionType = {
  empresa: string;
  liquiNumero: number;
  cuit: string;
  ultimoDeposito: string;
  banco: string;
  cuil: string;
  beneficiario: string;
  ingreso: string;
  categoria: string;
  remBasica: string;
  periodoLiquidado: string;
  codigos: CodigoLiquidacionType[];
  totalHaberes: string;
  totalDeducciones: string;
  totalNeto: string;
  totalNetoEnPalabras: string;
  firma: any;
  firmado: boolean;
  fechaFirmado: string | null;
};

export default LiquidacionType;
