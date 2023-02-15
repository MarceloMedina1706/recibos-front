import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Hooks/redux-hooks";
import { fetchAuthEmail } from "../../../Storage/User-actions";
import ButtonD from "../../UI/Buttons/ButtonD";
import ButtonE from "../../UI/Buttons/ButtonE";
import classes from "./AjusteSeguridad.module.css";

const AjusteSeguridad: React.FC<{ closeModal: () => void }> = (props) => {
  const id = useAppSelector(s => s.user.cuil);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector(s => s.user.authEmail);
  const [res, setRes] = useState<number>(auth ? 1 : 0);
  const radioHanlder = (state: number) => {
    setRes(state);
  };

  const sendHandler = () => {
    dispatch(fetchAuthEmail(id, res, navigate));
  }


  return (
    <div className={classes.container}>
      <div>
        <p className={classes.title}>Autenticación por correo electrónico</p>
        <p className={classes.legend}>
          Para tu seguridad puedes añadir un factor de autenticación para
          verificar tu acceso a través de la cuenta de email asociada.
        </p>
        <div className={classes.container_radios}>
          <div>
            <label className={classes.form_control}>
              <input
                type="radio"
                name="mail"
                className={classes.radio}
                value={1}
                checked={res === 1}
                onChange={() => radioHanlder(1)}
              />
              <span style={{ textAlign: "left" }}>Si</span>
            </label>
          </div>
          <div>
            <label className={classes.form_control}>
              <input
                type="radio"
                name="mail"
                className={classes.radio}
                value={0}
                checked={res === 0}
                onChange={() => radioHanlder(0)}
              />
              <span style={{ textAlign: "left" }}>No</span>
            </label>
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
              onClickHandler={sendHandler}
              width={"130px"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AjusteSeguridad;
