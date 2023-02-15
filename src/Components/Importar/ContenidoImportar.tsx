import { ChangeEvent,  useRef, useState } from "react";
import ButtonFile from "../UI/Buttons/ButtonFile";
import classes from "./ContenidoImportar.module.css";
import ScannedData from "./ScannedData";
import * as XLSX from "xlsx";
import { formatearDatos, detectarRepetidos, getCalculosExcel, formatearArray, verificarCabecera } from "../../Services/Importar-service";
import ScannedType from "../../Types/ScannedType";
import Swal from "sweetalert2";




const ContenidoImportar = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [scanned, setScanned] = useState<ScannedType | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
   
    const file = e.target.files!.item(0);

    if(file == null) {
      return;
    }
    if(file!.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
      Swal.fire({
        icon: "warning",
        text: "El archivo debe ser un Excel."
      });
      return;
    }


    const reader = new FileReader();
    reader.onload = (evt: any) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws);

      try{
        verificarCabecera(data);
        const content = formatearDatos(data);
        const resultadoCalculos = getCalculosExcel(content);
        const repited = detectarRepetidos(content);
        const format = formatearArray(content);
        const datos: ScannedType = {
          FileName: file!.name,
          Calculo: resultadoCalculos,
          Contenido: content,
          Repetidos: repited,
          DatosRevisar: format
        }

        setScanned(datos);

      }catch(e: any){
        Swal.fire({icon: "error", text: e.message});
        setScanned(null);
        return;
      }
      
    }

    reader.readAsBinaryString(file!);
  }


  const setNullScanned = () => {
    setScanned(null);
  }

  return (
    <div className={classes.container}>
      <div>
        <ButtonFile
          textButton={"Seleccionar Excel"}
          width={"50px"}
          ref={fileRef}
          onChangeFile={onChangeHandler}
        />
      </div>
      <div>
        {scanned && <ScannedData datos={scanned!} toggleScaned={setNullScanned } />}
      </div>
    </div>
  );
};

export default ContenidoImportar;
