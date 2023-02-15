import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Hooks/redux-hooks";
import { fetchLiquidacionesEmpleado } from "../../Storage/Liquidacion-actions";
import ListLiqui from "./ListLiquis";

const ContenidoVer = () => {

    const empleado = useAppSelector(s => s.user.cuil);
    const dispatch = useAppDispatch();
    const [change, setChange] = useState<boolean>(false);
    const navigate = useNavigate()

    const changeHandler = (state: boolean) => {
        setChange(state)
    }

    useEffect(()=>{
        dispatch(fetchLiquidacionesEmpleado(empleado, navigate));
        if(change) setChange(false);
    }, [empleado, change, dispatch, navigate]);

    return <div style={{marginTop: "30px"}}><ListLiqui setChange={changeHandler} /></div>
};

export default ContenidoVer;