import Visualizador from "./Visualizador";
import VisualizadorHeader from "./VisualizadorHeader";
import classes from "./VisualizadorRecibo.module.css";

const VisualizadorRecibo = () => {
  return (
    <div className={classes.container}>
      <VisualizadorHeader />
      <Visualizador />
    </div>
  );
};

export default VisualizadorRecibo;
