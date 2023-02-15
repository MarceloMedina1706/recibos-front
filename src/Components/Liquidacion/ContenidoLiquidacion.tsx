import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../Hooks/redux-hooks";
import DatosLiquisType from "../../Types/DatosLiquisType";
import DatosLiquidacion from "./DatosLiquidacion";

const ContenidoLiquidacion = () => {
    const params = useParams();
    const navigate = useNavigate();
    const liquis = useAppSelector(state => state.liquidacion.liquidaciones);
    const [liqui, setLiqui] = useState<DatosLiquisType | null>(null);
    const liquiId = params && params.liqui;

    useEffect(()=>{
        if(!liquis){
            navigate("/VerLiquidaciones");
            return;
        }
        if(liquiId !== null){
            const res = liquis?.filter(s => s.liquiId === +liquiId!)[0];
            setLiqui(res || null);
        }

    }, [liquiId, liquis, navigate]);


    return <DatosLiquidacion datos={liqui} />
};

export default ContenidoLiquidacion;