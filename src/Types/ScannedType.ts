import DatosRevisarType from "./DatosRevisarType";
import ResultadoCalculoType from "./ResultadoCalculoType";
import RowFileType from "./RowFileType";
import RowRepitedType from "./RowRepitedType";

type ScannedType = {
  FileName: string;
  Calculo: ResultadoCalculoType;
  Contenido: RowFileType[];
  Repetidos: RowRepitedType[];
  DatosRevisar: DatosRevisarType[];
};

export default ScannedType;
