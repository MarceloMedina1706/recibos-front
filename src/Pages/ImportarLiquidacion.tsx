import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContenidoImportar from "../Components/Importar/ContenidoImportar";
import { checkLog } from "../Utils/SessionHandler";

const ImportarLiquidacion = () => {
  const navigate = useNavigate();
  const [showContenido, setShowContenido] = useState<boolean>(false);
  useEffect(() => {
    if (checkLog(navigate)) setShowContenido(true);
  }, [navigate]);

  return (
    <>
      {showContenido && (
        <ContenidoImportar />
      )}
    </>
  );
};

export default ImportarLiquidacion;
