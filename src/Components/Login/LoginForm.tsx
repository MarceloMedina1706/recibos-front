import Input from "../UI/Input";
import classes from "./LoginForm.module.css";
import logo from "../../Assets/logo_major.png";
import ButtonA from "../UI/Buttons/ButtonA";
import { useAppDispatch, useAppSelector } from "../../Hooks/redux-hooks";
import { fetchUser } from "../../Storage/User-actions";
import React, { useRef } from "react";
import UserLoginType from "../../Types/UserLoginType";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mailRef = useRef<HTMLInputElement>(null);
  const claveRef = useRef<HTMLInputElement>(null);

  const loading = useAppSelector((s) => s.ui.loginFormLoading);

  const loginHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredMail = mailRef.current!.value;
    const enteredClave = claveRef.current!.value;
    const userLogin: UserLoginType = {
      mail: enteredMail,
      clave: enteredClave,
    };
    dispatch(fetchUser(userLogin, navigate));

    // const cuil = GetItems().cuil;
    // dispatch(setUser(cuil))
  };

  const recuperoHandler = () => {
    navigate("/recupero");
  };

  return (
    <form onSubmit={loginHandler}>
      <div className={classes.container_logo}>
        <img src={logo} alt={"logo"} />
      </div>
      <div className={classes.container_inputs}>
        <Input legend={"Mail"} type={null} ref={mailRef} value={null} />
        <Input legend={"Clave"} type={"password"} ref={claveRef} value={null} />
      </div>
      <div className={classes.container_buttons}>
        <div>
          <p className={classes.forget} onClick={recuperoHandler}>
            ¿Olvidó su contraseña?
          </p>
        </div>
        <div>
          {!loading ? (
            <ButtonA textButton={"Iniciar Sesión"} />
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

export default LoginForm;
