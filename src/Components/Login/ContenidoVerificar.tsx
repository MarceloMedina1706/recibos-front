import { useEffect } from "react";
import LoginLayout from "../UI/Layout/LoginLayout";
import VerificacionForm from "./VerificacionForm";
import { getVerification } from "../../Utils/SessionHandler"
import { useNavigate } from "react-router-dom";

const ContenidoVerificar = () => {

  const navigate = useNavigate();
  useEffect(()=>{
    if(!getVerification().codigo){
      console.log(getVerification())
      navigate("/login");
    }
  }, [navigate]);

  return (
    <LoginLayout>
      <VerificacionForm />
    </LoginLayout>
  );
};

export default ContenidoVerificar;

