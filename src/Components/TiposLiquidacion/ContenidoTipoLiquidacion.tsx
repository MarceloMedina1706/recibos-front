import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { fetchEliminarTipoLiquidacion, fetchTipoLiquidacion } from "../../Services/TipoLiquidacion-service";
import TipoLiquidacionType from "../../Types/TipoLiquidacionType";
import ButtonC from "../UI/Buttons/ButtonC";
import classes from "./ContenidoTipoLiquidacion.module.css";
import ModalEditarTipoLiquidacion from "./ModalEditarTipoLiquidacion";
import { logout, resetStates } from "../../Utils/SessionHandler";
import { useAppDispatch } from "../../Hooks/redux-hooks";
import { useNavigate } from "react-router-dom";

const ContenidoTipoLiquidacion = () => {


  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const [tiposLiqui, setTiposLiqui] = useState<TipoLiquidacionType[] | null>(
    null
  );

  const [tipoLiqui, setTipoLiqui] = useState<TipoLiquidacionType | null>(
    null
  );

  const [accion, setAccion] = useState<number>(1);
  const [change, setChange] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const agregarHandler = () => {
    setTipoLiqui(null);
    setAccion(1);
    setShowModal(true);
  };
  const editarHandler = (id: number) => {
    const tipo = tiposLiqui!.filter((t) => t.id === id)[0];
    setTipoLiqui(tipo!);
    setAccion(2);
    setShowModal(true);
  };
  const eliminarHandler = async (id: number) => {
    const res = await fetchEliminarTipoLiquidacion(id);
    if(res === 401){
      logout();
      resetStates(dispatch);
      navigate("/login");
      return;
    }
      if (res) {
        Swal.fire({
          icon: "success",
          text: "El cambio se ha realizado satisfactoriamente.",
        });

        changeHandler(true)
      }
  };

  const changeHandler = (s: boolean) => {
    setChange(s)
  }

  const closeModal = () => {
    setShowModal(false)
  }



  useEffect(() => {
    const getTiposLiqui = async () => {
      const tiposLiquis = await fetchTipoLiquidacion();
      if(tiposLiquis === 401){
        logout();
        resetStates(dispatch);
        navigate("/login");
      }else{

        setTiposLiqui(tiposLiquis);
      }
      if(change) setChange(false);
    };

    getTiposLiqui();
    
  }, [change, dispatch, navigate]);

  return (
    <>
      <div className={classes.container}>
        <div>
          <ButtonC
            textButton={"Agregar Tipo Liquidación"}
            width={"240px"}
            onClickHandler={agregarHandler}
          />
          {tiposLiqui && (
            <table>
              <thead>
                <tr>
                  <th>Tipo Liquidación</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tiposLiqui.map((tipo) => (
                  <tr key={tipo.id}>
                    <td>{tipo.descripcion}</td>
                    <td>
                      <button
                        onClick={() => editarHandler(tipo.id)}
                        className={classes.btn_editar}
                      >
                        Editar
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => eliminarHandler(tipo.id)}
                        className={classes.btn_eliminar}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <ModalEditarTipoLiquidacion
          tipoLiqui={tipoLiqui}
          closeModal={closeModal} 
          accion={accion}
          changeHandler={changeHandler}
        />
      )}
    </>
  );
};

export default ContenidoTipoLiquidacion;
