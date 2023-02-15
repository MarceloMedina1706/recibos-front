import { useEffect, useRef, useState } from "react";
import { fetchEmpleadosLiquidacion } from "../../Services/Liquidacion-service";
import EmpleadosLiquidacionType from "../../Types/EmpleadosLiquidacionType";
import ButtonC from "../UI/Buttons/ButtonC";
import Modal from "../UI/Modal/Modal";
import ModalVer from "./ModalVer";
import Swal from "sweetalert2";
import { logout, resetStates } from "../../Utils/SessionHandler";
import { useAppDispatch } from "../../Hooks/redux-hooks";
import { useNavigate } from "react-router-dom";

const ModalRevisar: React.FC<{
  toggleModalHandler: (s: boolean) => void;
  empleado: string;
  liquiId: number;
}> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [datos, setDatos] = useState<EmpleadosLiquidacionType[] | null>(null);
  const [itemsMatch, setItemsMatch] = useState<
    EmpleadosLiquidacionType[] | null
  >(null);
  const [showModalVer, setShowModalVer] = useState<boolean>(false);

  const [itemEmpleado, setItemEmpleado] = useState<string>("");
  const [itemLiquiId, setItemLiquiId] = useState<number>(0);

  const searchRef = useRef<HTMLInputElement>(null);

  const searchHandler = () => {
    if (!searchRef.current || searchRef.current.value === "") {
      setItemsMatch(datos);
    } else {
      setItemsMatch(
        datos!.filter((i) => i.empleadoId.startsWith(searchRef.current!.value))
      );
    }
  };

  const toggleModalVer = (emp: string) => {
    setItemEmpleado(emp);
    setItemLiquiId(props.liquiId);
    setShowModalVer(true);
  };

  const closeModalVer = () => {
    setShowModalVer(false);
  };

  useEffect(() => {
    const fetchEmpLiq = async () => {
      const res = await fetchEmpleadosLiquidacion(
        props.empleado,
        props.liquiId
      );
      if (res === null) {
        Swal.fire({
          icon: "error",
          text: "Ha ocurrido un error",
        });
        return;
      }
      if (res === 401) {
        logout();
        resetStates(dispatch);
        navigate("/login");
        return;
      }
      if((typeof res !== "number")){
        if (res?.code === 1) {
          setDatos(res.data);
          setItemsMatch(res.data);
        } else {
          Swal.fire({
            icon: "error",
            text: res?.message!,
          });
        }
      }
      
    };
    fetchEmpLiq();
  }, [props.empleado, props.liquiId, dispatch, navigate]);

  return (
    <Modal
      closeModal={() => {
        props.toggleModalHandler(false);
      }}
    >
      <input
        type="text"
        style={{ width: "40%", marginBottom: "2em", padding: "5px" }}
        placeholder="Ingrese un CUIL"
        onChange={searchHandler}
        ref={searchRef}
      />
      {itemsMatch && itemsMatch.length > 0 && (
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>CUIL</th>
              <th>Total haberes</th>
              <th>Total deducciones</th>
              <th>Total neto</th>
              <th>Códigos</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {itemsMatch &&
              itemsMatch.map((item) => (
                <tr key={item.empleadoId}>
                  <td>{item.empleadoId}</td>
                  <td>{item.totalHaberes}</td>
                  <td>{item.totalDeducciones}</td>
                  <td>{item.totalNeto}</td>
                  <td>{item.cantCodigos}</td>
                  <td>
                    <ButtonC
                      textButton={"Ver"}
                      onClickHandler={() => {
                        toggleModalVer(item.empleadoId);
                      }}
                      width={"80px"}
                    />
                  </td>
                </tr>
              ))}
            {itemsMatch.length === 0 && <span></span>}
          </tbody>
        </table>
      )}
      {showModalVer && (
        <ModalVer
          closeModal={closeModalVer}
          empleado={itemEmpleado}
          liquiId={itemLiquiId}
        />
      )}
      <div style={{ marginTop: "3em" }}>
        <ButtonC
          textButton={"Cerrar"}
          onClickHandler={() => props.toggleModalHandler(false)}
          width={"180px"}
        />
      </div>
    </Modal>
  );
};

export default ModalRevisar;
