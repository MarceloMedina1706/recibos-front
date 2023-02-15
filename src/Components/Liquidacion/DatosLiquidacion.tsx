import { useEffect, useState } from "react";
import { useAppSelector } from "../../Hooks/redux-hooks";
import DatosLiquisType from "../../Types/DatosLiquisType";
import ButtonC from "../UI/Buttons/ButtonC";
import classes from "./DatosLiquidacion.module.css";
import ModalRevisar from "./ModalRevisar";

const DatosLiquidacion: React.FC<{ datos: DatosLiquisType | null }> = (
  props
) => {

  const h = (props.datos && +props.datos?.sumaTotalHaberes) || 0;
  const d = (props.datos && +props.datos?.sumaTotalDeducciones) || 0;
  const n = (props.datos && +props.datos?.sumaTotalNetos) || 0;
  const empleado = useAppSelector(s => s.user.cuil);

  const haberes = new Intl.NumberFormat().format(
    h
  );
  const deducciones = new Intl.NumberFormat().format(
    d
  );
  const neto = new Intl.NumberFormat().format(
    n
  );

  const [showModalRevisar, setShowModalRevisar] = useState<boolean>(false);

  const toggleModalRevisar = (toggle: boolean) => {
    setShowModalRevisar(toggle);
  };

  useEffect(() => {}, []);

  if (!props.datos) return null;

  return (
    <div style={{ paddingTop: "30px" }}>
      <div
        className={classes.grid_container}
        style={{ width: "53%", margin: "auto" }}
      >
        <div className={classes.item2}>Tipo de liquidación:</div>
        <div className={classes.item3}>{props.datos.descripcion}</div>
        <div className={classes.item2}>Periodo de liquidación:</div>
        <div className={classes.item3}>{props.datos.periodo}</div>
        <div className={classes.item2}>Cantidad de empleados:</div>
        <div className={classes.item3}>{props.datos.cantidadEmpleados}</div>
        <div className={classes.item4}>Suma total de haberes:</div>
        <div className={classes.item5}>{haberes}</div>
        <div className={classes.item6}>Suma total de deducciones:</div>
        <div className={classes.item7}>{deducciones}</div>
        <div className={classes.item8}>Suma total netos:</div>
        <div className={classes.item9}>{neto}</div>
        <div className={classes.item10}>
          <ButtonC
            textButton={"Revisar"}
            width={"200px"}
            onClickHandler={() => toggleModalRevisar(true)}
          />
        </div>
      </div>
      {showModalRevisar && (
        <ModalRevisar
          // datos={datosRevisar}
          toggleModalHandler={toggleModalRevisar} empleado={empleado} liquiId={props.datos.liquiId}        />
      )}
    </div>
  );
};

export default DatosLiquidacion;
