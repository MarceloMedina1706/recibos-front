import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../Hooks/redux-hooks";
import { cambiarClave } from "../../Services/User-service";
import { getPrimerLogin, logout, removePrimerLogin, resetStates } from "../../Utils/SessionHandler";
import { isClaveValid } from "../../Utils/ValidarClave";
import ButtonA from "../UI/Buttons/ButtonA";
import Input from "../UI/Input";
import classes from "./PrimerLoginForm.module.css";

const PrimerLoginForm = () => {
  const passRef = useRef<HTMLInputElement>(null);
  const passRepRef = useRef<HTMLInputElement>(null);

  const [claveNuevaError, setClaveNuevaError] = useState<string | null>(null);
  const [clavenuevaRepError, setClavenuevaRepError] = useState<string | null>(
    null
  );

  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enviar = async () => {
      const valid = isClaveValid(
        passRef.current!.value,
        passRepRef.current!.value,
        setClaveNuevaError,
        setClavenuevaRepError
      );
      
        if(!valid) return;

        setLoading(true);
      const cuil = getPrimerLogin();
      const res = await cambiarClave(cuil, "", passRef.current!.value, true);

      if (!res) {
        Swal.fire({
          icon: "error",
          text: "Ha ocurrido un error",
        });
        removePrimerLogin();
        navigate("/login");
        return;
      }

      if (res === 401) {
        logout();
        resetStates(dispatch);
        navigate("/login");
        return;
      }

      if (typeof res !== "number") {
        if (res?.code === 0) {
          Swal.fire({
            icon: "error",
            text: res.message,
          });
          removePrimerLogin();
          navigate("/login");
          return;
        } else if (res?.code === 1) {
          Swal.fire({
            icon: "success",
            text: res?.message,
          }).then(() => {
            removePrimerLogin();
            navigate("/login");
          });
          return;
        }
      }

      setLoading(false);
    };

    enviar();
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div>
        <div>
          <p className={classes.legend}>
            Para continuar es necesario que cambie la clave.
          </p>
        </div>
        <div className={classes.clave}>
          <Input legend={"Clave:"} type={"password"} ref={passRef} value={null} />
          {claveNuevaError && (
            <p className={classes.errorMensaje}>{claveNuevaError}</p>
          )}
        </div>
        <div className={`${classes.pass} ${classes.clave}`}>
          <Input
            legend={"Repita la clave:"}
            type={"password"}
            ref={passRepRef} value={null}          />
          {clavenuevaRepError && (
            <p className={classes.errorMensaje}>{clavenuevaRepError}</p>
          )}
        </div>
        {!loading ? (
          <div style={{ marginTop: "35px" }}>
            <ButtonA textButton={"Continuar"} />
          </div>
        ) : (
            <ClipLoader
              cssOverride={{ display: "block", margin: "35px auto 0 auto" }}
              size={30}
            />
        )}
      </div>
    </form>
  );
};

export default PrimerLoginForm;
