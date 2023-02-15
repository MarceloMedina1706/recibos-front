import { useRef } from "react";
import ButtonD from "../UI/Buttons/ButtonD";
import ButtonE from "../UI/Buttons/ButtonE";
import Input from "../UI/Input";
import Modal from "../UI/Modal/Modal";
import classes from "./ModalAgregarTLiquidacion.module.css";

const ModalAgregarTLiquidacion: React.FC<{
  toggleModalAgregarTL: (s: boolean) => void;
  onSendData: (s: string) => void;
}> = (props) => {
  const tipoRef = useRef<HTMLInputElement>(null);

  const onSendData = () => {
    const enteredValue = tipoRef.current?.value;
    if(enteredValue?.trim().length === 0){
        return;
    }

    props.onSendData(enteredValue!);


  }

  return (
    <Modal closeModal={() => props.toggleModalAgregarTL(false)}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Input legend={"Tipo de Liquidación"} type={"text"} ref={tipoRef} value={null} />
      </div>
      <div className={classes.container_buttons}>
        <div>
          <div className={classes.buttons}>
            <ButtonE
              textButton={"Cancelar"}
              onClickHandler={() => props.toggleModalAgregarTL(false)}
              width={"130px"}
            />
            <ButtonD
              textButton={"Guardar"}
              onClickHandler={onSendData}
              width={"130px"}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAgregarTLiquidacion;
