import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContenidoDocumentos from "../Components/Documentos/ContenidoDocumentos";
import { checkLog } from "../Utils/SessionHandler";

const Documentos = () => {
  // const navigate = useNavigate();
  // const [showContenido, setShowContenido] = useState<boolean>(false);
  // useEffect(() => {
  //   if (checkLog(navigate)) setShowContenido(true);
  // }, [navigate]);
  // return <>{showContenido && <ContenidoDocumentos />}</>;
  return <ContenidoDocumentos />;
};

export default Documentos;
