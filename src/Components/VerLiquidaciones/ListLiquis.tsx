import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../Hooks/redux-hooks";
import { eliminarLiquidacion } from "../../Services/Liquidacion-service";
import { logout, resetStates } from "../../Utils/SessionHandler";
import ButtonC from "../UI/Buttons/ButtonC";
import ButtonG from "../UI/Buttons/ButtonG";

const ListLiqui: React.FC<{setChange: (s: boolean)=>void}> = (props) => {

    const liquidaciones = useAppSelector(s => s.liquidacion.liquidaciones);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handler = (liquiId: number) => {
      navigate(`/liquidacion/${liquiId}`);
    }

    const eliminarHandler = async (liquiId: number) => {
      const response = await eliminarLiquidacion(liquiId);

      if(response === 401){
        logout();
        resetStates(dispatch);
        navigate("/login");
        return;
    }

      if(response === null){
        Swal.fire({icon: "error", text: "Ha ocurrido un error"});
        return;
      }

      if((typeof response !== "number")){
        if(response!.code === 1 ){
          Swal.fire({icon: "success", text: response.message!});
          props.setChange(true);
        }
        else if(response!.code === 0){
            Swal.fire({icon: "error", text: response.message!});
        }
    }
      
    }


    if(!liquidaciones) return null;

    return (
        <table style={{ width: "80%", margin: "auto", textAlign: "center" }}>
          <thead>
            <tr>
              <th>Período</th>
              <th>Descripción</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {liquidaciones && liquidaciones.map((l) => (
              <tr key={l.liquiId}>
                <td>{l.periodo}</td>
                <td>{l.descripcion}</td>
                <td>
                    <ButtonC textButton={"Ver"} onClickHandler={() => handler(l.liquiId) } width={"80px"} />
                    <ButtonG textButton={"Eliminar"} onClickHandler={() => eliminarHandler(l.liquiId) } width={"80px"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    );
}

export default ListLiqui;

/*

import classes from "./ListLiquis.module.css";

const ListLiquis = (props) => {
    const handler = (liquiId) =>{
        props.verLiquHander(liquiId)
    }

    const eliminarHandler = (liquiId) => {
      props.eliminarLiquiHandler(liquiId);
    }


  return (
    <table style={{ width: "80%", margin: "auto", textAlign: "center" }}>
      <thead>
        <tr>
          <th>Periodo</th>
          <th>Descripción</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.liquidaciones.map((l) => (
          <tr key={l.liquiId}>
            <td>{l.periodo}</td>
            <td>{l.descripcion}</td>
            <td>
              <button className={classes.btn_ver} onClick={() => handler(l.liquiId)}>Ver</button>
              <button className={classes.btn_eliminar} onClick={() => eliminarHandler(l.liquiId)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListLiquis;



*/