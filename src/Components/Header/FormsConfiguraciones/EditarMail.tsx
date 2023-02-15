import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Hooks/redux-hooks";
import { fetchCambiarEmail } from "../../../Storage/User-actions";
import { isEmailValid } from "../../../Utils/VAlidarEmail";
import ButtonD from "../../UI/Buttons/ButtonD";
import ButtonE from "../../UI/Buttons/ButtonE";
import Input from "../../UI/Input";
import classes from "./EditarMail.module.css";

const EditarMail: React.FC<{ closeModal: () => void }> = (props) => {
  const correoNuevoRef = useRef<HTMLInputElement>(null);
  const claveActualRef = useRef<HTMLInputElement>(null);
  const mail= useAppSelector(s => s.user.mail);
  const id = useAppSelector(s => s.user.cuil);

  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const [mensajeError, setMensajeError] = useState<string | null>(null);
  const [claveMensajeError, setClaveMensajeError] = useState<string | null>(
    null
  );

  const guardarHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredClave = claveActualRef.current!.value;
    const enteredEmail = correoNuevoRef.current!.value;
    
    const valid = isEmailValid(enteredEmail, enteredClave, setMensajeError, setClaveMensajeError);
    if(!valid) return;

    dispatch(fetchCambiarEmail(id, enteredClave, enteredEmail, navigate));


  };

  return (
    <div className={classes.container}>
      <form onSubmit={guardarHandler}>
        <p className={classes.title}>Cambia tu email personal</p>
        <p className={classes.legend}>
          Tu correo electrónico actual asociado es
        </p>
        <div className={classes.email_actual}>
          <FontAwesomeIcon icon={faEnvelope} size="2x" />
          <span className={classes.email}>{mail}</span>
        </div>
        <p className={classes.legend}>
          Introduce un correo electrónico nuevo y tu clave actual
        </p>
        <div className={classes.container_inputs}>
          <div>
            <Input
              legend={"Correo electrónico nuevo"}
              type={"text"}
              ref={correoNuevoRef} value={null}            />
            {mensajeError && (
              <p className={classes.errorMensaje}>{mensajeError}</p>
            )}
          </div>
          <div>
            <Input
              legend={"Ingrese clave actual"}
              type={"password"}
              ref={claveActualRef} value={null}            />
            {claveMensajeError && (
              <p className={classes.errorMensaje}>{claveMensajeError}</p>
            )}
          </div>
        </div>
        <div className={classes.container_buttons}>
          <div>
            <ButtonE textButton={"Cancelar"} onClickHandler={props.closeModal } width={"130px"} />
            <ButtonD textButton={"Guardar"} onClickHandler={()=>{}} width={"130px"} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditarMail;
