import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Hooks/redux-hooks";
import { fetchLiquidacion, fetchLiquidacionItems, setChange } from "../../Storage/Liquidacion-actions";
import { GetItems } from "../../Utils/SessionHandler";
import classes from "./ContenidoDocumentos.module.css";
import ListaDocumentos from "./Lista/ListaDocumentos";
import VisualizadorRecibo from "./Visualizador/VisualizadorRecibo";


const ContenidoDocumentos = () => {
  const dispatch = useAppDispatch();
  const change = useAppSelector(state => state.liquidacion.change);
  const itemActive = useAppSelector(state => state.liquidacion.itemActive);
  const recibo = useAppSelector(state => state.liquidacion.liquidacion);
  const navigate = useNavigate()

  useEffect(()=>{
    if(change){
      const id = GetItems().cuil;
      dispatch(fetchLiquidacionItems(id, navigate));
      dispatch(setChange(false));
    }

    if(itemActive !== 0 && recibo === null){
      const id = GetItems().cuil;
      dispatch(fetchLiquidacion(id, itemActive, navigate));
      dispatch(setChange(false));
    }

  }, [dispatch, change, navigate, itemActive, recibo]);

  return (
    <div className={classes.container}>
      {/* <div style={{marginTop: "15px", maxHeight: "70vh", overflowY: "auto", padding: "10px", width: "340px"}}> */}
      <div>
        <ListaDocumentos />
      </div>
      <VisualizadorRecibo />
    </div>
  );
};

export default ContenidoDocumentos;
