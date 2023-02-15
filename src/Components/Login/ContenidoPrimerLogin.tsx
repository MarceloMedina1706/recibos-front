import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPrimerLogin } from "../../Utils/SessionHandler";
import LoginLayout from "../UI/Layout/LoginLayout";
import PrimerLoginForm from "./PrimerLoginForm";

const ContenidoPrimerLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!getPrimerLogin()) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <LoginLayout>
      <PrimerLoginForm />
    </LoginLayout>
  );
};

export default ContenidoPrimerLogin;
