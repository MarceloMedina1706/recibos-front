import LiquidacionType from "../Types/LiquidacionType";
import { saveAs } from "file-saver";
import { GenerarPdf } from "../Utils/RecibosHaberesPDF";
var zip = require('jszip')();

export const descargarZip  = async (recibos: LiquidacionType[]) => {
    let pdfs = [];
    
    for(let i=0; i<recibos.length; i++){
      const pdf = await GenerarPdf(recibos[i]);
      pdfs.push(pdf);
      //console.log(pdf.nombre) 
    }
    pdfs.forEach(pdf => {
      zip.file(pdf.nombre, pdf.base64, {base64: true});
    });

    zip.generateAsync({type: 'blob'}).then(function(content: any){
      //console.log(content)
      saveAs(content, "Recibos.zip");
    });

    zip = require('jszip')();
};


