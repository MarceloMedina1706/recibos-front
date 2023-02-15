import React from "react";
import ButtonC from "../UI/Buttons/ButtonC";
import Modal from "../UI/Modal/Modal";

const ModalEmpleados: React.FC<{
  datos: string[];
  toggleModalEmpleados: (s: boolean) => void;
}> = (props) => {

    const datos = props.datos;

  return (
    <Modal closeModal={() => props.toggleModalEmpleados(false)}>
      <h4 style={{ marginBottom: "20px" }}>
        Los empleados con los siguientes CUILs no están cargados en la base de
        datos.
      </h4>
      {datos && datos.map((d) => <p key={d}>{d}</p>)}
      <div style={{ marginTop: "3em" }}>
        <ButtonC textButton={"Cerrar"} onClickHandler={() => props.toggleModalEmpleados(false)} width={"250px"} />
      </div>
    </Modal>
  );
};

export default ModalEmpleados;
