import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../../Hooks/redux-hooks";
import { descargarZip } from "../../../Services/DescargarZipService";
import { getLiquidaciones } from "../../../Services/Liquidacion-service";
import { logout, resetStates } from "../../../Utils/SessionHandler";
import ListItem from "./ListItem";
import classes from "./ListItems.module.css";

const ListItems = () => {
  const items = useAppSelector((state) => state.liquidacion.liquidacionItems);
  const id = useAppSelector(s => s.user.cuil);

  const itemsPendientes = items.filter((i) => !i.visto);
  const itemVisto = items.filter((i) => i.visto && !i.firmado);
  const itemsFirmado = items.filter((i) => i.firmado);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const descargarTodoHandler = async () => {
    const liquiIds = itemsFirmado.map(i => {return i.liqui_Id});
    const res = await getLiquidaciones(id, liquiIds);

    if(res === 401){
      logout();
      resetStates(dispatch);
      navigate("/login");
      return;
    }

    if(!res){
      Swal.fire({
        icon: "error",
        text: "Ha ocurrido un error."
      });

      return;
    }

    if(res.code === 1){
      const datos = res.data;
      descargarZip(datos);

    }else{
      Swal.fire({
        icon: "error",
        text: res.message
      });

      return;
    }

  };

  return (
    <div>
      <Fragment>
        {itemsPendientes.length > 0 && (
          <p className={classes.pendientes}>Pendientes de firma</p>
        )}
        {itemsPendientes.length > 0 &&
          itemsPendientes.map((i) => <ListItem key={i.liqui_Id} item={i} />)}
      </Fragment>
      <Fragment>
        {itemVisto.length > 0 && <p className={classes.vistos}>Vistos</p>}
        {itemVisto.length > 0 &&
          itemVisto.map((i) => <ListItem key={i.liqui_Id} item={i} />)}
      </Fragment>
      <Fragment>
        {itemsFirmado.length > 0 && (
          <div style={{ display: "flex" }}>
            <p className={classes.firmados}>Firmados</p>
            <p className={classes.btn_descargar} onClick={descargarTodoHandler}>
              <FontAwesomeIcon icon={faDownload} /> Descargar Todo
            </p>
          </div>
        )}
        {itemsFirmado.length > 0 &&
          itemsFirmado.map((i) => <ListItem key={i.liqui_Id} item={i} />)}
      </Fragment>
    </div>
  );
};

export default ListItems;
