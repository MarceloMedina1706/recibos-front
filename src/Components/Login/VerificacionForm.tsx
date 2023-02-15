import classes from "./VerificacionForm.module.css";
import logo from "../../Assets/logo_major.png";
import Input from "../UI/Input";
import React, { useRef } from "react";
import {
  getVerification,
  removeVerification,
} from "../../Utils/SessionHandler";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ButtonA from "../UI/Buttons/ButtonA";

const VerificacionForm = () => {
  const loading = false;
  const codigoRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const datos = getVerification();
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCodigo = codigoRef.current!.value;
    if (enteredCodigo.trim().length > 0) {
      if (enteredCodigo === datos.codigo) {
        removeVerification();
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          text: "Código Erroneo.",
        });
      }
    }
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div>
        <div className={classes.empresa}>
          <img src={logo} alt="Logo Major" />
        </div>
        <div style={{ marginTop: "40px" }}>
          <Input
            legend={"Ingrese el código de verificación:"}
            type={"text"}
            ref={codigoRef} value={null}          />
        </div>
        {!loading ? (
          <div style={{ marginTop: "50px" }}>
            <ButtonA textButton={"Iniciar Sesión"} />
          </div>
        ) : (
          <span>Loading...</span>
          //   <ClipLoader
          //     cssOverride={{ display: "block", margin: "0 auto 0 auto" }}
          //     size={30}
          //   />
        )}
      </div>
    </form>
  );
};

export default VerificacionForm;
