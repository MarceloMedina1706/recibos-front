import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Hooks/redux-hooks";
import { fetchLiquidacion, setItemActive } from "../../../Storage/Liquidacion-actions";
import LiquidacionItemType from "../../../Types/LiquidacionItemType";
import classes from "./ListItem.module.css";

const ListItem: React.FC<{item: LiquidacionItemType}> = (props) => {

  const item = props.item;
  const dispatch = useAppDispatch();
  const id = useAppSelector(state => state.user.cuil);
  const navigate = useNavigate();

  const spanClasses = !item.visto ? `${classes.span_nofirmado}` : !item.firmado ? `${classes.span_visto}` : classes.span_firmado
  const spanIcoClasses = !item.visto ? `${classes.c_nofirmado}` : !item.firmado ? `${classes.c_visto}` : classes.c_firmado

  const selectHandler = () => {
    dispatch(setItemActive(+item.liqui_Id));
    dispatch(fetchLiquidacion(id, +item.liqui_Id, navigate));
  }

  return (
    <div className={classes.recibo} onClick={ selectHandler }>
      <span className={spanClasses}></span>
      <div>
        <span className={`${classes.span_ico} ${spanIcoClasses}`}>
          <FontAwesomeIcon icon={faFileLines} />
        </span>
        <div>
          <p className={classes.fecha}>
            {item.mes}/{item.anio}
          </p>
          {/*<p className={classes.tipo}>RECIBOS-MENSUALES</p>*/}
          <p className={classes.tipo}>{item.descripcion}</p>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
