import { useEffect } from "react";
import { useAppSelector } from "../../../Hooks/redux-hooks";
import { generarEmpties } from "../../../Services/Liquidacion-service";
import classes from "./Visualizador.module.css";
const Visualizador = () => {
  const recibo = useAppSelector((state) => state.liquidacion.liquidacion);

  const reciboElement = (
    <div>
      <div className={classes.container_recibo}>
        <div style={{ display: "flex", height: "75px" }}>
          <div className={classes.empresa}>
            <div>{recibo ? <p>{recibo.empresa}</p> : ""}</div>
            {/* EMPRESA */}
          </div>
          <div
            style={{
              width: "35%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{ color: "#000", textAlign: "center", fontSize: ".8em" }}
            >
              <p style={{ fontWeight: "bold" }}>RECIBO DE HABERES</p>
              <p>
                Nro.{" "}
                {recibo != null && (
                  <span style={{ fontWeight: "bold" }}>
                    {recibo.liquiNumero}
                  </span>
                )}
              </p>
              {/* NUMERO DE RECIBO */}
            </div>
          </div>
        </div>
        {/*<p
          style={{
            width: "50%",
            fontSize: ".8em",
            color: "#000",
            textAlign: "center",
            padding: "6px",
          }}
        >
          Dirección:{" "}
        </p>*/}
        {/* DIRECCION */}
        <table className={classes.table_items}>
          <thead>
            <tr>
              <th>CUIT</th>
              <th>Fec. Ult. Dep</th>
              <th>En Banco</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {recibo != null ? <td>{recibo.cuit}</td> : <td></td>}
              {recibo != null ? <td>{recibo.ultimoDeposito}</td> : <td></td>}
              {recibo != null ? <td>{recibo.banco}</td> : <td></td>}
            </tr>
          </tbody>
        </table>
        <div style={{ display: "flex" }}>
          {recibo != null && (
            <p style={{ width: "65%", color: "#000", padding: ".2em" }}>
              <span style={{ fontSize: ".6em" }}>BENEFICIARIO: </span>
              <span
                style={{
                  marginLeft: ".2em",
                  fontSize: ".75em",
                  fontWeight: "bold",
                }}
              >
                {recibo.beneficiario}
              </span>
            </p>
          )}
          {recibo != null && (
            <p style={{ width: "35%", color: "#000", padding: ".2em" }}>
              <span style={{ fontSize: ".6em" }}>CUIL: </span>
              {recibo != null ? (
                <span
                  style={{
                    marginLeft: ".2em",
                    fontSize: ".75em",
                    fontWeight: "bold",
                  }}
                >
                  {recibo.cuil}
                </span>
              ) : (
                <span></span>
              )}
            </p>
          )}
        </div>
        <table
          style={{
            width: "100%",
            fontSize: ".6em",
            color: "#000",
            borderCollapse: "collapse",
            borderTop: ".1em solid #000",
            borderBottom: ".1em solid #000",
          }}
        >
          <thead>
            <tr>
              <th>F. Ingreso</th>
              <th>Categoría</th>
              <th>Remuneración Básica</th>
              <th style={{ width: "35%" }}></th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "1.2em", textAlign: "center" }}>
            <tr>
              {recibo != null ? (
                <td style={{ paddingTop: "6px" }}>{recibo.ingreso}</td>
              ) : (
                <td></td>
              )}
              <td style={{ paddingTop: "6px" }}>
                {recibo != null && <span>{recibo.categoria}</span>}
              </td>
              <td style={{ paddingTop: "6px" }}>
                {recibo != null && <span>{recibo.remBasica}</span>}
              </td>
              <td style={{ width: "35%" }}></td>
            </tr>
          </tbody>
        </table>
        <p style={{ color: "#000", padding: "8px 2px", fontSize: ".6em" }}>
          Período liquidado:{" "}
          {recibo != null ? (
            <span style={{ fontWeight: "bold" }}>
              {recibo.periodoLiquidado}
            </span>
          ) : (
            <span style={{ fontWeight: "bold" }}></span>
          )}{" "}
        </p>
        <table className={classes.table_items}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Orden Concepto</th>
              <th style={{ textAlign: "left" }}>Descripcion</th>
              <th>Cantidad</th>
              <th>Haberes</th>
              <th>Deducciones</th>
            </tr>
          </thead>
          <tbody>
            {recibo != null &&
              recibo.codigos != null &&
              recibo.codigos.map((i) => (
                <tr key={i.codigo}>
                  <td style={{ textAlign: "left" }}>{i.codigo}</td>
                  <td style={{ textAlign: "left" }}>{i.descripcion}</td>
                  <td style={{ textAlign: "right" }}>{i.cantidad}</td>
                  {i.codTipo === "Haber" && (
                    <td style={{ textAlign: "right" }}>{i.importe}</td>
                  )}
                  {i.codTipo === "Haber" && <td></td>}
                  {i.codTipo === "Retención" && <td></td>}
                  {i.codTipo === "Retención" && (
                    <td style={{ textAlign: "right" }}>{i.importe}</td>
                  )}
                </tr>
              ))}
            {recibo != null &&
              recibo.codigos != null &&
              recibo.codigos.length < 12 &&
              generarEmpties(20 - recibo.codigos.length).map((m, i) => (
                <tr key={i}>
                  <td>{m[0]}</td>
                  <td>{m[1]}</td>
                  <td>{m[2]}</td>
                  <td>{m[3]}</td>
                  <td>{m[4]}</td>
                </tr>
              ))}
            <tr
              style={{
                borderTop: ".1em solid #000",
                borderBottom: ".1em solid #000",
              }}
            >
              <td></td>
              <td>TOTALES</td>
              <td></td>
              <td>{recibo != null ? recibo.totalHaberes : ""}</td>
              <td>{recibo != null ? recibo.totalDeducciones : ""}</td>
            </tr>
            <tr
              style={{
                borderTop: ".1em solid #000",
                borderBottom: ".1em solid #000",
              }}
            >
              <td></td>
              <td></td>
              <td>Total Neto</td>
              <td></td>
              <td>{recibo != null ? recibo.totalNeto : ""}</td>
            </tr>
          </tbody>
        </table>
        <table
          style={{
            width: "100%",
            color: "#000",
            borderCollapse: "collapse",
            borderBottom: ".1em solid #000",
          }}
        >
          <thead>
            <tr style={{ textAlign: "left", fontSize: ".75em" }}>
              <th>Son Pesos: </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ textAlign: "left", fontSize: ".8em" }}>
              <td>
                <span style={{ marginLeft: "70px" }}>
                  {recibo != null ? recibo.totalNetoEnPalabras : ""}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={classes.container_firma}>
          {recibo && recibo.firmado && (
            <img src={"data:image/png;base64," + recibo.firma} alt="hola" />
          )}
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (recibo !== null) {
      //console.log(recibo);
    }
  }, [recibo]);

  return (
    <div className={classes.visualizador}>
      <h1>{recibo && reciboElement}</h1>
    </div>
  );
};

export default Visualizador;
