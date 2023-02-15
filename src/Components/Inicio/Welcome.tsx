import { useAppSelector } from "../../Hooks/redux-hooks";
import classes from "./Welcome.module.css";

const Welcome = () => {
  const user = useAppSelector(state => state.user);

  return (
    <div className={classes.welcome_message}>
      <div>
        <p style={{color: 'rgb(79, 65, 163)'}}>Buenos días {`${user.nombre} ${user.apellido}`},</p>
        <p style={{fontSize: '0.7em', opacity: '0.6', color:'#000'}}>
          Bienvenido nuevamente al perfil de empleados
        </p>
      </div>
    </div>
  );
};

export default Welcome;
