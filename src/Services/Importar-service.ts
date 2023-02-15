import Swal from "sweetalert2";
import { urlImportarLiquidaciones, urlVerificarEmpleados } from "../Endpoints";
import DatosRevisarType from "../Types/DatosRevisarType";
import ResponseVerificarEmpleadosType from "../Types/ResponseVerificarEmpleadosType";
import ResultadoCalculoType from "../Types/ResultadoCalculoType";
import RowFileType from "../Types/RowFileType";
import RowRepitedType from "../Types/RowRepitedType";
import { GetItems } from "../Utils/SessionHandler";

export const verificarCabecera = (data: string) => {
  let arrayAux: string[] = [];
  let index = 0;
  let aux = "";

  for (let i = 0; i < data.length; i++) {
    if (data[i] !== "," && data[i] !== "\n") {
      aux += data[i];
    } else if (data[i] === ",") {
      arrayAux[index] = aux;
      index++;
      aux = "";
    } else if (data[i] === "\n" || i === data.length - 1) {
      arrayAux[index] = aux;
      break;
    }
  }

  if (arrayAux.length !== 15) throw new Error("Error en el formato del Excel");
};

export const formatearDatos = (data: string) => {
  let newData: RowFileType[] = [];
  let arrayAux: string[] = [];
  let index = 0;
  let aux = "";
  let i = 0;
  for (i = 0; i < data.length; i++) {
    if (data[i] !== "," && data[i] !== "\n") {
      aux += data[i];
    } else if (data[i] === ",") {
      arrayAux[index] = aux;
      index++;
      aux = "";
    } else if (data[i] === "\n" || i === data.length - 1) {
      arrayAux[index] = aux;
      newData.push(formatearJson(arrayAux));
      arrayAux = [];
      index = 0;
      aux = "";
    }

    if (i === data.length - 1) {
      arrayAux[index] = aux;
      newData.push(formatearJson(arrayAux));
      arrayAux = [];
      index = 0;
      aux = "";
    }
  }
  return newData;
};

const formatearJson = (data: string[]) => {
  const row: RowFileType = {
    //LiquiId: data[0],
    EmpleadoId: data[0],
    Descripcion: data[1],
    Categoria: data[2],
    SueldoBasico: data[3],
    Banco: data[4],
    FecUltDep: data[5],
    TotHaberes: data[6],
    TotDeducciones: data[7],
    TotNeto: data[8],
    Codigo: data[9],
    Cantidad: data[10],
    Porcentaje: data[11],
    Importe: data[12],
    CodDescripcion: data[13],
    CodTipo: data[14],
  };

  return row;
};

export const detectarRepetidos = (data: RowFileType[]) => {
  let repetidos: RowRepitedType[] = [];

  data.forEach((liqui) => {
    let isIn = false;
    if (repetidos.length > 0) {
      const rep = repetidos.filter(
        (r) =>
          r.liqui.EmpleadoId === liqui.EmpleadoId &&
          r.liqui.Codigo === liqui.Codigo
      );
      if (rep.length > 0) {
        isIn = true;
      }
    }

    if (!isIn) {
      let cont = 0;
      let rowNumber: number[] = [];
      data.forEach((li, ind) => {
        if (liqui.EmpleadoId === li.EmpleadoId && liqui.Codigo === li.Codigo) {
          rowNumber.push(ind + 1);
          cont++;
        }
      });
      if (cont > 1) {
        repetidos.push({
          row: JSON.stringify(rowNumber),
          //row: rowNumber,
          liqui: liqui,
        });
      }
    }
    // const aux = data.filter(l => l.EmpleadoId === liqui.EmpleadoId && l.Codigo === liqui.Codigo);
    // if(aux.length > 1){
    //   const rep = repetidos.filter(r => r.EmpleadoId === aux[0].EmpleadoId && r.Codigo === aux[0].Codigo);

    //   if(rep.length === 0){
    //     repetidos.push(aux[0]);
    //   }
    // }
  });

  // console.log(repetidos.length);
  // console.log(repetidos);
  if (repetidos.length > 0) {
    Swal.fire({
      icon: "info",
      text: `Se detectaron ${repetidos.length} códigos repetidos`,
    });
  }
  return repetidos;
};

export const getCalculosExcel = (data: RowFileType[]) => {
  let empleado = "";
  let cantidadEmpleados = 0;
  let sumaTotHaberes = 0.0;
  let sumaTotDeducciones = 0.0;
  let sumaTotNeto = 0.0;

  data.forEach((item, i) => {
    if (i === 0 || empleado !== item.EmpleadoId) {
      const h = getNumber(item.TotHaberes);
      const d = getNumber(item.TotDeducciones);
      const n = getNumber(item.TotNeto);

      if (isNaN(h) || isNaN(d) || isNaN(n)) {
        throw new Error("Error en el formato del Excel, fila: " + (i + 1));
      }

      empleado = item.EmpleadoId;
      sumaTotHaberes += getNumber(item.TotHaberes);
      sumaTotDeducciones += getNumber(item.TotDeducciones);
      sumaTotNeto += getNumber(item.TotNeto);
      cantidadEmpleados++;
    }
  });

  const result: ResultadoCalculoType = {
    CantEmpleado: cantidadEmpleados,
    SumaTotalHaberes: sumaTotHaberes,
    SumaTotalDeducciones: sumaTotDeducciones,
    SumaTotalNeto: sumaTotNeto,
  };

  return result;
};

export const formatearArray = (datos: RowFileType[]) => {
  //console.log(datos);

  let empleado = "";
  let result: DatosRevisarType[] = [];
  let header: any = {};
  let codigos: any[] = [];

  datos.forEach((item, i) => {
    if (i === 0) {
      empleado = item.EmpleadoId;
      header = {
        EmpleadoId: item.EmpleadoId,
        Descripcion: item.Descripcion,
        Categoria: item.Categoria,
        SueldoBasico: getNumber(item.SueldoBasico),
        Banco: item.Banco,
        FecUltDep: item.FecUltDep,
        TotHaberes: getNumber(item.TotHaberes),
        TotDeducciones: getNumber(item.TotDeducciones),
        TotNeto: getNumber(item.TotNeto),
      };
    }

    if (empleado === item.EmpleadoId) {
      codigos.push({
        Codigo: getInteger(item.Codigo),
        Cantidad: getNumber(item.Cantidad),
        Porcentaje: getNumber(item.Porcentaje),
        Importe: getNumber(item.Importe),
        CodDescripcion: item.CodDescripcion,
        CodTipo: item.CodTipo,
      });
    } else {
      empleado = item.EmpleadoId;
      header.Codigos = codigos;
      codigos = [
        {
          Codigo: getInteger(item.Codigo),
          Cantidad: getNumber(item.Cantidad),
          Porcentaje: getNumber(item.Porcentaje),
          Importe: getNumber(item.Importe),
          CodDescripcion: item.CodDescripcion,
          CodTipo: item.CodTipo,
        },
      ];
      result.push(header);
      header = {
        EmpleadoId: item.EmpleadoId,
        Descripcion: item.Descripcion,
        Categoria: item.Categoria,
        SueldoBasico: getNumber(item.SueldoBasico),
        Banco: item.Banco,
        FecUltDep: item.FecUltDep,
        TotHaberes: getNumber(item.TotHaberes),
        TotDeducciones: getNumber(item.TotDeducciones),
        TotNeto: getNumber(item.TotNeto),
      };
    }

    if (i === datos.length - 1) {
      header.Codigos = codigos;
      result.push(header);
      header = {};
      codigos = [];
      empleado = "";
    }
  });

  return result;
};

export const verificarEmpleados = async (empleados: string[]) => {
  let sw = 0;

  const token = GetItems().token;
  const response = await fetch(`${urlVerificarEmpleados}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(empleados),
  }).catch(() => {
    sw = 1;
  });

  if (response?.status === 401) {
    const res: number = 401;
    return res;
  }

  if (sw === 1 || !response?.ok) return null;

  const data: ResponseVerificarEmpleadosType = await response!.json();
  if (data.code === 1) {
    return true;
  } else if (data.code === 2) {
    return data.data;
  } else {
    Swal.fire({ icon: "error", text: data.message! });
    return false;
  }
};

export const sendLiquidaciones = async (
  datos: DatosRevisarType[],
  liquiId: number,
  force: boolean | null,
  tipoLiqui: string | null
) => {
  let sw = 0;
  let json;
  let url: string = "";
  if (force) {
    json = {
      Liquis: datos,
      LiquiId: liquiId,
      TipoLiquidacion: tipoLiqui,
    };
    url = `${urlImportarLiquidaciones}/true`;
  } else {
    json = {
      Liquis: datos,
      LiquiId: liquiId,
    };
    url = urlImportarLiquidaciones;
  }

  const token = GetItems().token;
  const response = await fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(json),
  }).catch(() => {
    sw = 1;
  });

  if (response?.status === 401) {
    const res: number = 401;
    return res;
  }

  if (sw === 1 || !response?.ok) return null;

  const data: ResponseVerificarEmpleadosType = await response!.json();
  return data;
};

const getNumber = (number: string) => {
  if (number.includes(",") && number.includes(".")) {
    var strEx = number;
    strEx = strEx.replace(".", "");
    strEx = strEx.replace(",", ".");
    var valor = parseFloat(strEx);
    console.log(valor);
    return valor;
  }
  const res = parseFloat(number);
  return res;
};

const getInteger = (number: string) => {
  return parseInt(number);
};
