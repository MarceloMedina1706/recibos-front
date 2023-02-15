import classes from "./Mensajes.module.css";
import imgmsg from "../../Assets/imgmsg.png";

const Mensajes = () => {
  return (
    <div className={classes.messages}>
      <div>
        {/* <img src="imgmsg-removebg-preview.png" style="width: 60%" /> */}
        <img src={imgmsg} alt={"msg"} style={{width: '60%'}}  />
      </div>
      <div>
        <p style={{color: 'rgb(79, 65, 163)'}}>Hoy no hay mensajes</p>
        <p style={{fontSize: '0.7em', opacity: '0.6', color: '#000'}}>
          En esta sección podrás encontrar novedades y noticias
        </p>
      </div>
    </div>
  );
};

export default Mensajes;
