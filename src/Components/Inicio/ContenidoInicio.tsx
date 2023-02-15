import classes from "./ContenidoInicio.module.css";
import Mensajes from "./Mensajes";
import Perfil from "./perfil";
import Welcome from "./Welcome";


const ContenidoInicio = () => {
  return (
    <div className={classes.container}>
      <div>
        <div className={classes.left}>
          <Perfil />
        </div>
        <div className={classes.right}>
          <Welcome />
          <Mensajes />
        </div>
      </div>
    </div>
  );
};

export default ContenidoInicio;
