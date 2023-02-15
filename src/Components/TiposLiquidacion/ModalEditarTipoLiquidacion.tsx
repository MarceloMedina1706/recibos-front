import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../Hooks/redux-hooks";
import { fetchAgregarTipoLiquidacion, fetchEditarTipoLiquidacion } from "../../Services/TipoLiquidacion-service";
import TipoLiquidacionType from "../../Types/TipoLiquidacionType";
import { logout, resetStates } from "../../Utils/SessionHandler";
import ButtonD from "../UI/Buttons/ButtonD";
import ButtonE from "../UI/Buttons/ButtonE";
import Input from "../UI/Input";
import Modal from "../UI/Modal/Modal";
import classes from "./ModalEditarTipoLiquidacion.module.css";

const ModalEditarTipoLiquidacion: React.FC<{
  closeModal: () => void;
  tipoLiqui: TipoLiquidacionType | null;
  accion: number;
  changeHandler: (s: boolean)=>void
}> = (props) => {
  const descripcionRef = useRef<HTMLInputElement>(null);
  const tipoLiqu = props.tipoLiqui;

  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const agregarHandler = async () => {
    if (props.accion === 1) {
      const json: TipoLiquidacionType = {
        id: 0,
        descripcion: descripcionRef.current!.value,
      };
      const res = await fetchAgregarTipoLiquidacion(json);
      props.closeModal();
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

        props.changeHandler(true)
      }
    } else if (props.accion === 2) {
      const json: TipoLiquidacionType = {
        id: tipoLiqu!.id,
        descripcion: descripcionRef.current!.value,
      };
      const res = await fetchEditarTipoLiquidacion(json);
      props.closeModal();
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
        props.changeHandler(true)
      }
    }
  };

  return (
    <Modal closeModal={props.closeModal}>
      <div style={{ width: "420px", margin: "auto" }}>
        <Input
          legend={"Tipo de Liquidación"}
          type={null}
          ref={descripcionRef}
          value={tipoLiqu ? tipoLiqu.descripcion : null}
        />
      </div>
      <div>
        <div className={classes.container_buttons}>
          <ButtonE
            textButton={"Cancelar"}
            onClickHandler={props.closeModal}
            width={"130px"}
          />
          <ButtonD
            textButton={"Guardar"}
            onClickHandler={agregarHandler}
            width={"130px"}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditarTipoLiquidacion;
