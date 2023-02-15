import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import logo from "../../Assets/logo_major.png";
import classes from "./RecuperoClaveForm.module.css";
import Input from "../UI/Input";
import ButtonA from "../UI/Buttons/ButtonA";
import { useNavigate } from "react-router-dom";
import UserRecuperado from "../../Types/UserRecuperadoType";
import { reestablecerClave } from "../../Services/User-service";
import Swal from "sweetalert2";
import { isClaveValid } from "../../Utils/ValidarClave";
import ClipLoader from "react-spinners/ClipLoader";

const RecuperoClaveForm: React.FC<{ data: UserRecuperado | null }> = (
  props
) => {
  const navigate = useNavigate();
  const claveRef = useRef<HTMLInputElement>(null);
  const claveRepRef = useRef<HTMLInputElement>(null);

  const [claveRec, setClaveRec] = useState<string | null>(null);
  const [claveRepRec, setClaveRepRec] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const datos = props.data;

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredClave = claveRef.current?.value;
    const enteredClaveRep = claveRepRef.current?.value;
    if (
      enteredClave?.trim().length === 0 &&
      enteredClaveRep?.trim().length === 0
    )
      return;

    const valid = isClaveValid(
      enteredClave!,
      enteredClaveRep!,
      setClaveRec,
      setClaveRepRec
    );
    if (!valid) return;
      setLoading(true);
    const fetchPassword = async () => {
      const response = await reestablecerClave(
        datos?.tokenId!,
        datos?.empleadoId!,
        enteredClave!
      );
      if (response === null) {
        Swal.fire({
          icon: "error",
          text: "Ha ocurrido un error",
        });
      }
      if (response!.code === 1) {
        Swal.fire({
          icon: "success",
          text: response!.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: response!.message,
        });
      }
      setLoading(false);
      navigate("/login");
    };

    fetchPassword();
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
      <p className={classes.title}>
        Hola, <span>{datos?.nombre || ""}</span>
      </p>
      <div className={classes.container_inputs}>
        <div>
          <Input
            legend={"Ingrese una clave nueva:"}
            type={"password"}
            ref={claveRef}
            value={null}
          />
          {claveRec && <p className={classes.errorMensaje}>{claveRec}</p>}
        </div>
        <div>
          <Input
            legend={"Repita la clave:"}
            type={"password"}
            ref={claveRepRef}
            value={null}
          />
          {claveRepRec && <p className={classes.errorMensaje}>{claveRepRec}</p>}
        </div>
      </div>
      <div className={classes.container_buttons}>
        <div>
          {!loading ? (
            <ButtonA textButton={"Enviar"} />
          ) : (
            <ClipLoader
              cssOverride={{ display: "block", margin: "1.5em auto 0 auto" }}
              size={30}
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default RecuperoClaveForm;
