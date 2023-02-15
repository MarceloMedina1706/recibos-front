import React from "react";
import RowRepitedType from "../../Types/RowRepitedType";
import ButtonC from "../UI/Buttons/ButtonC";
import Modal from "../UI/Modal/Modal";

const ModalRepeated: React.FC<{datos: RowRepitedType[], toggleModalRepHandler: (s: boolean)=>void}> = (props) => {
  const datos = props.datos;
  return (
    <Modal
      closeModal={() => props.toggleModalRepHandler(false)}
    >
      <table style={{width: "100%"}}>
        <thead>
          <tr>
            <th>CUIL</th>
            <th>Código</th>
            <th>Descripción</th>
            <th>Líneas</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item, index) => (
              <tr key={`${item.liqui.EmpleadoId}-${index}`}>
                <td>{item.liqui.EmpleadoId}</td>
                <td>{item.liqui.Codigo}</td>
                <td>{item.liqui.CodDescripcion}</td>
                <td>{item.row.replace("[", "").replace("]", "").replace(",", ", ")}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div style={{marginTop: "3em"}}>
            <ButtonC textButton={"Cerrar"} onClickHandler={() => props.toggleModalRepHandler(false) } width={"250px"} /> 
        </div>
    </Modal>
  );
};

export default ModalRepeated;
