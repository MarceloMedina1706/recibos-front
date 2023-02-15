import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../Hooks/redux-hooks";
import {
  sendLiquidaciones,
  verificarEmpleados,
} from "../../Services/Importar-service";
import { fetchTipoLiquidacion } from "../../Services/TipoLiquidacion-service";
import ScannedType from "../../Types/ScannedType";
import TipoLiquidacionType from "../../Types/TipoLiquidacionType";
import { logout, resetStates } from "../../Utils/SessionHandler";
import ButtonB from "../UI/Buttons/ButtonB";
import ButtonC from "../UI/Buttons/ButtonC";
import ModalAgregarTLiquidacion from "./ModalAgregarTLiquidacion";
import ModalEmpleados from "./ModalEmpleados";
import ModalRepeated from "./ModalRepeated";
import ModalRevisar from "./ModalRevisar";
import classes from "./ScannedData.module.css";

const ScannedData: React.FC<{
  datos: ScannedType;
  toggleScaned: () => void;
}> = (props) => {
  const haberes = new Intl.NumberFormat().format(
    props.datos.Calculo.SumaTotalHaberes
  );
  const deducciones = new Intl.NumberFormat().format(
    props.datos.Calculo.SumaTotalDeducciones
  );
  const neto = new Intl.NumberFormat().format(
    props.datos.Calculo.SumaTotalNeto
  );

  const repited = props.datos.Repetidos;
  const datosRevisar = props.datos.DatosRevisar;

  const [showModalRevisar, setShowModalRevisar] = useState<boolean>(false);
  const [showModalRepited, setShowModalRepited] = useState<boolean>(false);
  const [showModalEmpleados, setShowModalEmpleados] = useState<boolean>(false);
  const [showModalAgregarTL, setShowModalAgregarTL] = useState<boolean>(false);
  const [empleados, setEmpleados] = useState<string[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const anioRef = useRef<HTMLSelectElement>(null);
  const mesRef = useRef<HTMLSelectElement>(null);
  const TipoRef = useRef<HTMLSelectElement>(null);
  const [tiposLiqui, setTiposLiqui] = useState<TipoLiquidacionType[]>();

  const toggleModalRevisar = (toggle: boolean) => {
    setShowModalRevisar(toggle);
  };

  const toggleModalRepeated = (toggle: boolean) => {
    setShowModalRepited(toggle);
  };

  const toggleModalEmpleados = (toggle: boolean) => {
    setShowModalEmpleados(toggle);
  };

  const toggleModalAgregarTL = (toggle: boolean) => {
    setShowModalAgregarTL(toggle);
  };

  const sendDataLiqui = () => {
    const enteredAnio = anioRef.current!.value;
    const enteredMes = mesRef.current!.value;
    const enteredTipo = TipoRef.current!.value;

    if (repited && repited.length > 0) {
      console.log("Hay repetido, no se puede enviar nada");
      return;
    }

    const tipoId = +enteredTipo < 10 ? `0${enteredTipo}` : enteredTipo;
    const liquId = `${enteredAnio}${enteredMes}${tipoId}`;

    const empleados = datosRevisar.map((i) => {
      return i.EmpleadoId;
    });

    const getVerification = async () => {
      const verificacion = await verificarEmpleados(empleados);
      if (verificacion === 401) {
        const r: number = 401;
        return r;
      }
      if (verificacion === true) return true;
      else if (verificacion === false) return false;
      else if (typeof verificacion === "string") {
        setEmpleados(verificacion!);
        setShowModalEmpleados(true);
        return false;
      }
    };

    const send = async () => {
      setLoading(true);
      const result = await getVerification();
      if (!result) return;
      else if (result === 401) {
        logout();
        resetStates(dispatch);
        navigate("/login");
        return;
      }
      const res = await sendLiquidaciones(datosRevisar, +liquId, null, null);

      if (res === 401) {
        logout();
        resetStates(dispatch);
        navigate("/login");
      } else if (typeof res !== "number") {
        if (res?.code === 1) {
          Swal.fire({
            icon: "success",
            text: res?.message!,
          });
          props.toggleScaned();
        } else if (res?.code === 2) {
          Swal.fire({
            icon: "error",
            text: res?.message!,
          });
        } else if (res?.code === 3) {
          Swal.fire({
            icon: "warning",
            text: res?.message!,
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              toggleModalAgregarTL(true);
              //toggleModalTipoLiqui(true);
            }
          });
        }
      }else if(!res){
        Swal.fire({
          icon: "error",
          text: "Ha ocurrido un error."
        });
      }

      setLoading(false);
    };

    send();
  };

  const sendDataLiquiForce = (tipo: string) => {
    const enteredAnio = anioRef.current!.value;
    const enteredMes = mesRef.current!.value;
    const enteredTipo = TipoRef.current!.value;
    const tipoId = +enteredTipo < 10 ? `0${enteredTipo}` : enteredTipo;
    const liquId = `${enteredAnio}${enteredMes}${tipoId}`;

    const send = async () => {
      const res = await sendLiquidaciones(datosRevisar, +liquId, true, tipo);
      toggleModalAgregarTL(false);
      if (res === 401) {
        logout();
        resetStates(dispatch);
        navigate("/login");
      } else if (typeof res !== "number") {
        if (res?.code === 1) {
          Swal.fire({
            icon: "success",
            text: res?.message!,
          });
        } else if (res?.code === 0) {
          Swal.fire({
            icon: "error",
            text: res?.message!,
          });
        }
        
      }else if(!res){
        Swal.fire({
          icon: "error",
          text: "Ha ocurrido un error."
        });
      }
    };

    send();
  };

  useEffect(() => {
    const getTipos = async () => {
      const tipos = await fetchTipoLiquidacion();
      if (tipos === 401) {
        logout();
        resetStates(dispatch);
        navigate("/login");
      } else {
        setTiposLiqui(tipos);
      }
    };

    getTipos();
  }, [dispatch, navigate]);

  return (
    <div className={classes.grid_container}>
      <div className={classes.item2}>Archivo seleccionado:</div>
      <div className={classes.item3}>{props.datos.FileName}</div>
      <div className={classes.item2}>Periodo de liquidación:</div>
      <div className={classes.item3}>
        <select className={classes.select} ref={anioRef}>
          <option value={"2022"}>2022</option>
          <option value={"2021"}>2021</option>
          <option value={"2020"}>2020</option>
        </select>
        <select className={classes.select} ref={mesRef}>
          <option value={"01"}>Enero</option>
          <option value={"02"}>Febrero</option>
          <option value={"03"}>Marzo</option>
          <option value={"04"}>Abril</option>
          <option value={"05"}>Mayo</option>
          <option value={"06"}>Junio</option>
          <option value={"07"}>Julio</option>
          <option value={"08"}>Agosto</option>
          <option value={"09"}>Septiembre</option>
          <option value={"10"}>Octubre</option>
          <option value={"11"}>Noviembre</option>
          <option value={"12"}>Diciembre</option>
        </select>
      </div>
      <div className={classes.item2}>Tipo de liquidación:</div>
      <div className={classes.item3}>
        <select className={classes.select} ref={TipoRef}>
          {tiposLiqui &&
            tiposLiqui.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.descripcion}
              </option>
            ))}
        </select>
      </div>
      <div className={classes.item2}>Cantidad de empleados:</div>
      <div className={classes.item3}>{props.datos.Calculo.CantEmpleado}</div>
      <div className={classes.item4}>Suma total de haberes:</div>
      <div className={classes.item5}>{haberes}</div>
      <div className={classes.item6}>Suma total de deducciones:</div>
      <div className={classes.item7}>{deducciones}</div>
      <div className={classes.item8}>Suma total netos:</div>
      <div className={classes.item9}>{neto}</div>
      <div className={classes.item10}>
        <ButtonC
          textButton={"Revisar"}
          width={"200px"}
          onClickHandler={() => toggleModalRevisar(true)}
        />
      </div>
      <div className={classes.item10}>
        {repited && repited.length > 0 && (
          <ButtonC
            textButton={"Revisar repetidos"}
            width={"200px"}
            onClickHandler={() => toggleModalRepeated(true)}
          />
        )}
      </div>
      <div className={classes.item10}>
        {!loading ? (
          <ButtonB
            textButton={"Enviar"}
            onClickHandler={() => sendDataLiqui()}
            width={"300px"}
          />
        ) : (
          <ClipLoader
            cssOverride={{ display: "block", margin: "0 auto 0 auto" }}
            size={30}
          />
        )}
      </div>
      {showModalRevisar && (
        <ModalRevisar
          datos={datosRevisar}
          toggleModalHandler={toggleModalRevisar}
        />
      )}
      {showModalRepited && (
        <ModalRepeated
          datos={repited}
          toggleModalRepHandler={toggleModalRepeated}
        />
      )}
      {showModalEmpleados && (
        <ModalEmpleados
          datos={empleados!}
          toggleModalEmpleados={toggleModalEmpleados}
        />
      )}
      {showModalAgregarTL && (
        <ModalAgregarTLiquidacion
          toggleModalAgregarTL={toggleModalAgregarTL}
          onSendData={sendDataLiquiForce}
        />
      )}
    </div>
  );
};

export default ScannedData;
