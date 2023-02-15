import React, { useRef } from "react";
import ButtonD from "../../UI/Buttons/ButtonD";
import ButtonE from "../../UI/Buttons/ButtonE";
import Input from "../../UI/Input";
import Modal from "../../UI/Modal/Modal";
import classes from "./ModalFirmar.module.css";

const ModalFirmar: React.FC<{ closeModal: () => void, firmarHandler: (clave: string)=>void }> = (props) => {

    const claveRef = useRef<HTMLInputElement>(null);
    const submitHandler = () => {
        const enteredClave = claveRef.current!.value;

        if(enteredClave.trim().length === 0){
            return;
        }

        props.firmarHandler(enteredClave);
    }


  return (
    <Modal closeModal={props.closeModal}>
      <div className={classes.container}>
        <div >
          <Input legend={"Ingrese su clave"} type={"password"} ref={claveRef} value={null} />
        </div>
        <div className={classes.container_buttons}>
          <div className={classes.buttons}>
            <ButtonE
              textButton={"Cancelar"}
              onClickHandler={props.closeModal}
              width={"130px"}
            />
            <ButtonD
              textButton={"Aceptar"}
              onClickHandler={submitHandler}
              width={"130px"}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalFirmar;
