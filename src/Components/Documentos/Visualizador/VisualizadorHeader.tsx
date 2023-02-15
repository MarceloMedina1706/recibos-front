import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Hooks/redux-hooks";
import { fetchFirma, setLiquidacionNull } from "../../../Storage/Liquidacion-actions";
import { GenerarPdf } from "../../../Utils/GenerarPdf";
import ButtonB from "../../UI/Buttons/ButtonB";
import ButtonC from "../../UI/Buttons/ButtonC";
import ModalFirmar from "./ModalFirmar";
import classes from "./VisualizadorHeader.module.css";

const VisualizadorHeader = () => {
  const liquiId = useAppSelector((state) => state.liquidacion.itemActive);
  const recibo = useAppSelector((state) => state.liquidacion.liquidacion);
  const isFirmado = recibo?.firmado;
  const id = useAppSelector((state) => state.user.cuil);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate()

  const closeModal = () => {
    setShowModal(false);
  };

  const showModalHandler = () => {
    if(!recibo) return;
    setShowModal(true);
    //dispatch(fetchFirma(id, liquiId));
  };

  const firmarHandler = (clave: string) => {
    dispatch(fetchFirma(id, clave, liquiId, navigate));
    dispatch(setLiquidacionNull());
    setShowModal(false);
  };

  const descargarHandler = () => {
    GenerarPdf(recibo!);
  }

  return (
    <div className={classes.container}>
      {isFirmado && (
        <div>
          <p style={{ color: "rgb(160, 160, 160)", fontSize: ".8em" }}>
            <span style={{ fontWeight: "bold" }}>firmado conforme el</span>{" "}
            {recibo.fechaFirmado}
          </p>
        </div>
      )}
      {!isFirmado && (
        <>
          <ButtonB
            textButton={"Firmar conforme"}
            onClickHandler={showModalHandler}
            width={"180px"}
          />
          {showModal && (
            <ModalFirmar
              closeModal={closeModal}
              firmarHandler={firmarHandler}
            />
          )}
        </>
      )}
      {isFirmado && (
        <div>
          <ButtonC textButton={"Descargar"} onClickHandler={descargarHandler } width={null} />
        </div>
      )}
    </div>
  );
};

export default VisualizadorHeader;
