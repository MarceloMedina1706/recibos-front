import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/redux-hooks";
import { fetchLiquidacionEspecifica } from "../../Services/Liquidacion-service";
import EmpleadosLiquidacionType from "../../Types/EmpleadosLiquidacionType";
import ButtonC from "../UI/Buttons/ButtonC";
import Modal from "../UI/Modal/Modal";
import classes from "./ModalVer.module.css";
import Swal from "sweetalert2";
import { logout, resetStates } from "../../Utils/SessionHandler";
import { useNavigate } from "react-router-dom";

const ModalVer: React.FC<{
  empleado: string;
  liquiId: number;
  closeModal: (s: boolean) => void;
}> = (props) => {
  const id = useAppSelector((s) => s.user.cuil);
  const [itemVer, setItemVer] = useState<EmpleadosLiquidacionType | null>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchLiquidacionEspecifica(
        id,
        props.empleado,
        props.liquiId
      );

      if(res === 401){
        logout();
        resetStates(dispatch);
        navigate("/login");
        return;
    }

      if (res === null) {
        Swal.fire({
          icon: "error",
          text: "Ha ocurrido un error",
        });
        return;
      }

      if((typeof res !== "number")){
        if (res?.code === 1) {
          setItemVer(res.data);
        }else {
          Swal.fire({
            icon: "error",
            text: res?.message!,
          });
        }
      }


      
    };

    fetchData();
  }, [id, props.empleado, props.liquiId, dispatch, navigate]);

  return (
    <Modal
      closeModal={() => {
        props.closeModal(false);
      }}
    >
      {itemVer && (
        <div>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>CUIL</th>
                <th>Descripción</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{itemVer.empleadoId}</td>
                <td>{itemVer.descripcion}</td>
                <td>{itemVer.categoria}</td>
              </tr>
            </tbody>
          </table>
          <table className={`${classes.table} ${classes.margin_table}`}>
            <thead>
              <tr>
                <th>Sueldo Básico</th>
                <th>Fec. Ult. Dep</th>
                <th>Banco</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{itemVer.sueldoBasico}</td>
                <td>{itemVer.fecUltDep.replace("T", " ")}</td>
                <td>{itemVer.banco}</td>
              </tr>
            </tbody>
          </table>
          <table className={`${classes.table} ${classes.margin_table}`}>
            <thead>
              <tr>
                <th>Total haberes</th>
                <th>Total deducciones</th>
                <th>Total neto</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{itemVer.totalHaberes}</td>
                <td>{itemVer.totalDeducciones}</td>
                <td>{itemVer.totalNeto}</td>
              </tr>
            </tbody>
          </table>
          <table className={`${classes.table_codigos} ${classes.margin_table}`}>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Cantidad</th>
                <th>Porcentaje</th>
                <th>Importe</th>
                <th>Descripción</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {itemVer.codigoLiquidaciones!.map((cod) => (
                <tr key={cod.codigo}>
                  <td>{cod.codigo}</td>
                  <td>{cod.cantidad}</td>
                  <td>{cod.porcentaje}</td>
                  <td>{cod.importe}</td>
                  <td>{cod.descripcion}</td>
                  <td>{cod.codTipo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div style={{ marginTop: "3em" }}>
        <ButtonC
          textButton={"Cerrar"}
          onClickHandler={() => props.closeModal(false)}
          width={"180px"}
        />
      </div>
    </Modal>
  );
};

export default ModalVer;
