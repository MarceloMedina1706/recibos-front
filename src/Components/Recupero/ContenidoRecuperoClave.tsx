import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { verificarTokenRecuperacion } from "../../Services/User-service";
import UserRecuperado from "../../Types/UserRecuperadoType";
import LoginLayout from "../UI/Layout/LoginLayout";
import RecuperoClaveForm from "./RecuperoClaveForm";

const ContenidoRecuperoClave = () => {
    const params = useParams();
    const token = params.token;
    const navigate = useNavigate();
    const [data, setData] = useState<UserRecuperado>();

    useEffect(()=>{
        if(token == null) navigate("/login");
        const fetchData = async () => {
            const data = await verificarTokenRecuperacion(token!);
            if(data === null){
                Swal.fire({
                    icon: "error",
                    text: "Ha ocurrido un error"
                });
                navigate("/login");
            }

            if(data?.code === 0){
                Swal.fire({
                    icon: "error",
                    text: data?.message!
                });
                navigate("/login");
            }else if(data?.code === 1){

                setData(data.data!);
            }
        }

        fetchData();

    }, [token, navigate]);


    return <LoginLayout><RecuperoClaveForm data={data || null}/></LoginLayout>
};

export default ContenidoRecuperoClave;