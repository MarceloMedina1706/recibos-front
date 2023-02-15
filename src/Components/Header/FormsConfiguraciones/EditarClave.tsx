import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../../Hooks/redux-hooks";
import { cambiarClave } from "../../../Services/User-service";
import { closeModal } from "../../../Storage/Submenu-actions";
import { logout, resetStates } from "../../../Utils/SessionHandler";
import { isClaveValid } from "../../../Utils/ValidarClave";
import ButtonD from "../../UI/Buttons/ButtonD";
import ButtonE from "../../UI/Buttons/ButtonE";
import Input from "../../UI/Input";
import classes from "./EditarClave.module.css";

const EditarClave: React.FC<{ closeModal: () => void }> = (props) => {
  const navigate = useNavigate();

  const claveActualRef = useRef<HTMLInputElement>(null);
  const claveNuevaRef = useRef<HTMLInputElement>(null);
  const clavenuevaRepRef = useRef<HTMLInputElement>(null);

  const [claveError, setClaveError] = useState<string | null>(null);
  const [claveNuevaError, setClaveNuevaError] = useState<string | null>(null);
  const [clavenuevaRepError, setClavenuevaRepError] = useState<string | null>(
    null
  );

  const empleado = useAppSelector((s) => s.user.cuil);
  const dispatch = useAppDispatch();

  const guardarHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredClaveActual = claveActualRef.current!.value;
    const enteredClaveNueva = claveNuevaRef.current!.value;
    const enteredClaveNuevaRep = clavenuevaRepRef.current!.value;

    if (enteredClaveActual.trim().length === 0) {
      setClaveError("Debe ingresar su clave.");
      return;
    } else {
      setClaveError(null);
    }

    const valid = isClaveValid(
      enteredClaveNueva,
      enteredClaveNuevaRep,
      setClaveNuevaError,
      setClavenuevaRepError
    );
    if (!valid) return;

    const response = await cambiarClave(
      empleado,
      enteredClaveActual,
      enteredClaveNueva,
      false
    );

    if (!response) {
      Swal.fire({
        icon: "error",
        text: "Ha ocurrido un error",
      });
      dispatch(closeModal());
    }

    if (response === 401) {
      logout();
      resetStates(dispatch);
      navigate("/login");
      return;
    }

    if (typeof response !== "number") {
      if (response?.code === 1) {
        Swal.fire({
          icon: "success",
          text: response.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: response?.message,
        });
      }
    }

    dispatch(closeModal());
  };

  return (
    <div className={classes.container}>
      <form onSubmit={guardarHandler}>
        <p className={classes.title}>Cambia tu clave de acceso</p>
        <div className={classes.editar_clave}>
          <div>
            <Input
              legend={"Ingrese clave actual"}
              type={"password"}
              ref={claveActualRef}
              value={null}
            />
            {claveError && <p className={classes.errorMensaje}>{claveError}</p>}
          </div>
          <div>
            <Input
              legend={"Ingrese nueva clave"}
              type={"password"}
              ref={claveNuevaRef}
              value={null}
            />
            {claveNuevaError && (
              <p className={classes.errorMensaje}>{claveNuevaError}</p>
            )}
          </div>
          <div>
            <Input
              legend={"Repita nueva clave"}
              type={"password"}
              ref={clavenuevaRepRef}
              value={null}
            />
            {clavenuevaRepError && (
              <p className={classes.errorMensaje}>{clavenuevaRepError}</p>
            )}
          </div>
        </div>
        <div className={classes.container_buttons}>
          <div>
            <ButtonE
              textButton={"Cancelar"}
              onClickHandler={props.closeModal}
              width={"130px"}
            />
            <ButtonD
              textButton={"Guardar"}
              onClickHandler={() => {}}
              width={"130px"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditarClave;
