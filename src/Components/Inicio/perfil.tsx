import classes from "./perfil.module.css";
import imglista from "../../Assets/lista.png";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../Hooks/redux-hooks";


const Perfil = () => {
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user);
  const navigateDocumentosHandler = () => {
    navigate("/documentos");
  }

  return (
    <div className={classes.perfil}>
      <div>
        <div className={classes.perfil_header}>
          <div className={classes.circulo}>
            <p>{user.nombre[0]+ "" +user.apellido[0]}</p>
          </div>
        </div>
        <div className={classes.perfil_body}>
          <div>
            <p className={classes.perfil_nombre}>{user.nombre }</p>
            <p className={classes.perfil_nombre}>{user.apellido}</p>
          </div>
          <div style={{marginTop: "0.4em"}}>
            <p className={classes.perfil_mail}>{user.mail}</p>
          </div>
        </div>
      </div>
      <div className={classes.perfil_footer} onClick = {navigateDocumentosHandler} >
        <div style={{width: '30%'}}>
          <img style={{width: '50%'}} src={imglista}  alt={"list"}/>
        </div>
        <div style={{position: 'relative', left: '-3.6em'}}>
          <p style={{color: 'rgb(79, 65, 163)'}}>Documentos a firmar</p>
          {user.sinFirmar > 0 &&
            <p className={classes.p_pendientes}>
              {user.sinFirmar} pendiente de firmar
            </p>
          }
          {user.sinFirmar === 0 &&
            <p className={classes.p_sin_pendientes}>
              Sin firmas pendientes.
            </p>
          }
        </div>
      </div>
    </div>
  );
};

export default Perfil;
