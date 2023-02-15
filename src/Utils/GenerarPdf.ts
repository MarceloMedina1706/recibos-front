import { PDFDocument } from "pdf-lib";
import { StandardFonts } from "pdf-lib/cjs/api";
import LiquidacionType from "../Types/LiquidacionType";

export async function GenerarPdf(recibo: LiquidacionType) {
  const existingPdfBytes = await fetch("./templates/Recibo Template 4.pdf").then(
    (res) => res.arrayBuffer()
  );

  const pdfDoc = await PDFDocument.load(existingPdfBytes); //1cm = 28.3465puntos
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // const imgFirmaUrl = "./img/firma1.png";
  // const imgFirmaBytes = await fetch(imgFirmaUrl).then((res) => res.arrayBuffer());
  const imgFirmaBytes = recibo.firma;
  let imgFirma = null;

  try{
    imgFirma = await pdfDoc.embedPng(imgFirmaBytes);
  }catch(e){
    imgFirma = await pdfDoc.embedJpg(imgFirmaBytes);
  }

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const heightPage = firstPage.getHeight();
  const widthPage = firstPage.getWidth();

  const fontSize = 9;
  const fontHeight = font.sizeAtHeight(fontSize);

  const pMargeny = heightPage - calcularPuntosTipograficos(1.25) - fontHeight / 2;
  const pMargenX = calcularPuntosTipograficos(1.5);

  //HEADER ==================================================================================================================================
  const nro = `Nro: ${recibo.liquiNumero}`;
  const empresa = recibo.empresa;
  const fontSizeNumRecibo = 11;

  const margenXNumRecibo = widthPage - calcularPuntosTipograficos(2);
  const xNumRecibo =
    margenXNumRecibo -
    calcularPuntosTipograficos(5.66) / 2 -
    font.widthOfTextAtSize(nro, fontSizeNumRecibo) / 2;
  const yNumRecibo = heightPage - 75;


  firstPage.drawText(empresa, {
    x: 55,
    y: yNumRecibo + 5,
    font: font,
    size: 22,
  });

  firstPage.drawText(nro, {
    x: xNumRecibo,
    y: yNumRecibo,
    font: font,
    size: fontSizeNumRecibo,
  });

  //TABLA DATOS DEPOSITO ==================================================================================================================================
  const ddTexto = [recibo.cuit, recibo.ultimoDeposito, recibo.banco];
  const pCuit = calcularPuntosTipograficos(5.3);
  const pFech = calcularPuntosTipograficos(7.53);
  const pBanco = calcularPuntosTipograficos(5.3);

  const ddCoordenadas = {
    y: pMargeny - calcularPuntosTipograficos(3.83),
    cuit: {
      x:
        pMargenX + pCuit / 2 - font.widthOfTextAtSize(ddTexto[0], fontSize) / 2,
    },
    fech: {
      x:
        pMargenX +
        pCuit +
        pFech / 2 -
        font.widthOfTextAtSize(ddTexto[1], fontSize) / 2,
    },
    banco: {
      x:
        pMargenX +
        pCuit +
        pFech +
        pBanco / 2 -
        font.widthOfTextAtSize(ddTexto[2], fontSize) / 2,
    },
  };

  firstPage.drawText(ddTexto[0], {
    x: ddCoordenadas.cuit.x,
    y: ddCoordenadas.y,
    font: font,
    size: fontSize,
  });

  firstPage.drawText(ddTexto[1], {
    x: ddCoordenadas.fech.x,
    y: ddCoordenadas.y,
    font: font,
    size: fontSize,
  });

  firstPage.drawText(ddTexto[2], {
    x: ddCoordenadas.banco.x,
    y: ddCoordenadas.y,
    font: font,
    size: fontSize,
  });

  //BENEFICIARIO CUIL ==================================================================================================================================
  const beneficiario = `${recibo.beneficiario}`;
  const cuil = recibo.cuil;

  const yBenCuil = pMargeny - calcularPuntosTipograficos(4.43) - 3;

  const pBeneficiario = calcularPuntosTipograficos(11.4);
  const xBeneficiario = pMargenX + 65;

  const xCuil = pMargenX + pBeneficiario + 30;

  firstPage.drawText(beneficiario, {
    x: xBeneficiario,
    y: yBenCuil,
    font: font,
    size: fontSize,
  });

  firstPage.drawText(cuil, {
    x: xCuil,
    y: yBenCuil,
    font: font,
    size: fontSize,
  });

  //DATOS F. Ingreso Categoría Remuneración Básica =================================================================================================
  const fIngreso = recibo.ingreso;
  const categoria = recibo.categoria;
  const remBasica = recibo.remBasica;

  const pFechIng = calcularPuntosTipograficos(3.66);
  const pCategoria = calcularPuntosTipograficos(4.09);
  const pRemuneracion = calcularPuntosTipograficos(10.4);

  const dFCoordenadas = {
    y: pMargeny - calcularPuntosTipograficos(5.79) - 2,
    fechIng: {
      x:
        pMargenX +
        pFechIng / 2 -
        font.widthOfTextAtSize(fIngreso, fontSize) / 2,
    },
    categoria: {
      x:
        pMargenX +
        pFechIng +
        pCategoria / 2 -
        font.widthOfTextAtSize(categoria, fontSize) / 2,
    },
    remuneracion: {
      x:
        pMargenX +
        pFechIng +
        pCategoria +
        pRemuneracion / 2 -
        font.widthOfTextAtSize(remBasica, fontSize) / 2,
    },
  };

  firstPage.drawText(fIngreso, {
    x: dFCoordenadas.fechIng.x,
    y: dFCoordenadas.y,
    font: font,
    size: fontSize,
  });

  firstPage.drawText(categoria, {
    x: dFCoordenadas.categoria.x,
    y: dFCoordenadas.y,
    font: font,
    size: fontSize,
  });

  firstPage.drawText(remBasica, {
    x: dFCoordenadas.remuneracion.x,
    y: dFCoordenadas.y,
    font: font,
    size: fontSize,
  });

  //Período liquidado =================================================================================================
  const periodo = `${recibo.periodoLiquidado}`;

  const yPeriodo = pMargeny - calcularPuntosTipograficos(6.39) - 5;
  const xPeriodo = pMargenX + 80;

  firstPage.drawText(periodo, {
    x: xPeriodo,
    y: yPeriodo,
    font: font,
    size: fontSize,
  });

  //TABLA LIQUI =================================================================================================
  const margenConLinea = 3;
  const margenPrimeraCellDato = calcularPuntosTipograficos(7.7);
  const pHeigthCell = calcularPuntosTipograficos(0.55);
  const pConcepto = calcularPuntosTipograficos(1.64);
  const pDescripcion = calcularPuntosTipograficos(9.88);
  const pCantidad = calcularPuntosTipograficos(2.24);
  const pHaberes = calcularPuntosTipograficos(2.24);
  const pDeducciones = calcularPuntosTipograficos(2.14);

  const itemsLiqui = recibo.codigos;

  const iLiquiCoordenadas = {
    //yInicial: heightPage- pMargeny - margenPrimeraCellDato - fontHeight,
    yInicial: pMargeny - margenPrimeraCellDato - 2,
    concepto: {
      x: pMargenX + margenConLinea,
    },
    descripcion: {
      x: pMargenX + pConcepto + margenConLinea,
    },
    cantidad: {
      x: pMargenX + pConcepto + pDescripcion + pCantidad - margenConLinea,
    },
    haberes: {
      x:
        pMargenX +
        pConcepto +
        pDescripcion +
        pCantidad +
        pHaberes -
        margenConLinea,
    },
    deducciones: {
      x:
        pMargenX +
        pConcepto +
        pDescripcion +
        pCantidad +
        pHaberes +
        pDeducciones -
        margenConLinea,
    },
  };

  for (let i = 0; i < itemsLiqui.length; i++) {
    var concepto = itemsLiqui[i].codigo.toString();
    var descripcion = itemsLiqui[i].descripcion;
    var cantidad = itemsLiqui[i].cantidad;
    //var tipoConcepto = itemsLiqui[i].liquTipoConcepto;
    var haberes = "";
    var deducciones = "";

    // console.log(itemsLiqui[i])

    if (itemsLiqui[i].codTipo === "Haber") {
      haberes = itemsLiqui[i].importe;
    } else if (itemsLiqui[i].codTipo === "Retencion" || itemsLiqui[i].codTipo === "Retención") {
      deducciones = itemsLiqui[i].importe;
    }

    firstPage.drawText(concepto, {
      x: iLiquiCoordenadas.concepto.x,
      y: iLiquiCoordenadas.yInicial - pHeigthCell * i,
      font: font,
      size: fontSize,
    });

    firstPage.drawText(descripcion, {
      x: iLiquiCoordenadas.descripcion.x,
      y: iLiquiCoordenadas.yInicial - pHeigthCell * i,
      font: font,
      size: fontSize,
    });

    firstPage.drawText(cantidad, {
      x:
        iLiquiCoordenadas.cantidad.x -
        font.widthOfTextAtSize(cantidad, fontSize),
      y: iLiquiCoordenadas.yInicial - pHeigthCell * i,
      font: font,
      size: fontSize,
    });

    firstPage.drawText(haberes, {
      x:
        iLiquiCoordenadas.haberes.x - font.widthOfTextAtSize(haberes, fontSize),
      y: iLiquiCoordenadas.yInicial - pHeigthCell * i,
      font: font,
      size: fontSize,
    });

    firstPage.drawText(deducciones, {
      x:
        iLiquiCoordenadas.deducciones.x -
        font.widthOfTextAtSize(deducciones, fontSize),
      y: iLiquiCoordenadas.yInicial - pHeigthCell * i,
      font: font,
      size: fontSize,
    });
  }

  // TOTALES
  const totHaberes = recibo.totalHaberes;
  const totDeducciones = recibo.totalDeducciones;
  const totNeto = recibo.totalNeto;

  const yTotales = pMargeny - calcularPuntosTipograficos(20.9);

  const wTotHabere = font.widthOfTextAtSize(totHaberes, fontSize);
  const xTotHaberesCell = pMargenX + calcularPuntosTipograficos(13.76);

  // const wTotDeducciones = font.widthOfTextAtSize(totDeducciones, fontSize);
  // const xTotDeduccionesCell = xTotHaberesCell + calcularPuntosTipograficos(2.24);

  // const wTotNeto = font.widthOfTextAtSize(totNeto, fontSize);

  const totalesCoordenadas = {
    y: yTotales - font.heightAtSize(fontSize) / 2,
    haberes: {
      x: xTotHaberesCell + (calcularPuntosTipograficos(3) / 2 - wTotHabere / 2),
    },
    deducciones: {
      x:
        iLiquiCoordenadas.deducciones.x -
        font.widthOfTextAtSize(totDeducciones, fontSize),
        //xTotDeduccionesCell +
        //(calcularPuntosTipograficos(2.14) - wTotDeducciones - margenConLinea),
    },
    neto: {
      y:
        yTotales -
        calcularPuntosTipograficos(0.55) -
        font.heightAtSize(fontSize) / 2,
      x:
        iLiquiCoordenadas.deducciones.x -
        font.widthOfTextAtSize(totNeto, fontSize),
        //xTotDeduccionesCell +
        //(calcularPuntosTipograficos(2.14) / 2 - wTotNeto / 2),
    },
  };

  firstPage.drawText(totHaberes, {
    x: totalesCoordenadas.haberes.x,
    y: totalesCoordenadas.y,
    font: font,
    size: fontSize,
  });

  firstPage.drawText(totDeducciones, {
    x: totalesCoordenadas.deducciones.x,
    y: totalesCoordenadas.y,
    font: font,
    size: fontSize,
  });

  firstPage.drawText(totNeto, {
    x: totalesCoordenadas.neto.x,
    y: totalesCoordenadas.neto.y,
    font: font,
    size: fontSize,
  });

  // NETO PALABRAS =================================================================================================
  const netoPalabra = recibo.totalNetoEnPalabras;
  const yPalabra = pMargeny - calcularPuntosTipograficos(22.6);
  const xPalabra = 110;
  firstPage.drawText(netoPalabra, {
    x: xPalabra,
    y: yPalabra,
    font: font,
    size: fontSize,
  });

  // FIRMA =================================================================================================
  const imgFirmaWidth = 150;
  const imgFirmaHeight = 100;
  const imgFirmaX = widthPage - calcularPuntosTipograficos(2) - imgFirmaWidth - margenConLinea;
  const imgFirmaY = 45

  firstPage.drawImage(imgFirma, {
    x: imgFirmaX,
    y: imgFirmaY,
    width: imgFirmaWidth,
    height: imgFirmaHeight,
  });

  const pdfBytes = await pdfDoc.save();
  const bytes = new Uint8Array(pdfBytes);
  const blob = new Blob([bytes], { type: "application/pdf" });
  console.log("HOLA")
  downloadFile(blob, `recibo-${recibo.periodoLiquidado}-${recibo.liquiNumero}.pdf`);
}

const calcularPuntosTipograficos = (numero: number) => {
  return numero * 28.35;
};

const downloadFile = (blob: any, fileName: any) => {
  const link = document.createElement("a");
  // create a blobURI pointing to our Blob
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  // some browser needs the anchor to be in the doc
  document.body.append(link);
  link.click();
  link.remove();
  // in case the Blob uses a lot of memory
  setTimeout(() => URL.revokeObjectURL(link.href), 7000);
};
