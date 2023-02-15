type Codigo = {
  Codigo: number;
  Cantidad: number;
  Porcentaje: number;
  Importe: number;
  CodDescripcion: string;
  CodTipo: string;
};

type DatosRevisarType = {
  EmpleadoId: string;
  Descripcion: string;
  Categoria: string;
  SueldoBasico: number;
  Banco: string;
  FecUltDep: string;
  TotHaberes: number;
  TotDeducciones: number;
  TotNeto: number;
  Codigos: Codigo[];
};

export default DatosRevisarType;
