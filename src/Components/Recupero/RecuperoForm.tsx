import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import logo from "../../Assets/logo_major.png";
import classes from "./RecuperoForm.module.css";
import Input from "../UI/Input";
import ButtonA from "../UI/Buttons/ButtonA";
import { useNavigate } from "react-router-dom";
import { sendDataRecupero } from "../../Services/User-service";
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";

const RecuperoForm = () => {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const cuilRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredEmail = emailRef.current?.value;
    const enteredCuil = cuilRef.current?.value;
    if (enteredEmail?.trim().length === 0 && enteredCuil?.trim().length === 0) {
      return;
    }

    const result = async () => {
      setLoading(true);
      const response = await sendDataRecupero(enteredEmail!, enteredCuil!);
      if (response == null) {
        Swal.fire({
          icon: "error",
          text: "Ha ocurrido un error",
          confirmButtonText: "Aceptar",
        }).then(() => {
          navigate("/login");
        });

        return;
      }

      if (response?.code === 1) {
        Swal.fire({
          icon: "info",
          text: response?.message,
          confirmButtonText: "Aceptar",
        }).then(() => {
          navigate("/login");
        });
      } else if (response?.code === 0) {
        Swal.fire({
          icon: "error",
          text: response?.message,
          confirmButtonText: "Aceptar",
        }).then(() => {
          navigate("/login");
        });
      }

      setLoading(false);
    };
    result();
  };

  const volverHandler = () => {
    navigate("/login");
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className={classes.container_volver} onClick={volverHandler}>
        <FontAwesomeIcon icon={faAngleLeft} />
        <p>volver</p>
      </div>
      <div className={classes.container_logo}>
        <img src={logo} alt="logo" />
      </div>
      <p className={classes.title}>Recupero de contraseña</p>
      <div className={classes.container_inputs}>
        <div>
          <Input legend={"Email"} type={null} ref={emailRef} value={null} />
        </div>
        <div>
          <Input legend={"CUIL"} type={null} ref={cuilRef} value={null} />
        </div>
      </div>
      <div className={classes.container_buttons}>
        <div>
          {!loading ? (
            <ButtonA textButton={"Enviar"} />
          ) : (
            <ClipLoader
              cssOverride={{ display: "block", margin: "0 auto 0 auto" }}
              size={30}
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default RecuperoForm;
