import { useRef, useState } from "react";
import DatosRevisarType from "../../Types/DatosRevisarType";
import ButtonC from "../UI/Buttons/ButtonC";
import Modal from "../UI/Modal/Modal";
import ModalVer from "./ModalVer";

const ModalRevisar: React.FC<{datos: DatosRevisarType[], toggleModalHandler: (s: boolean)=>void}> = (props) => {
  const datos = props.datos;

  const [itemVer, setItemVer] = useState<DatosRevisarType>();
  const [showModalVer, setShowModalVer] = useState(false);
  const [itemsMatch, setItemsMatch] = useState(datos);

  const searchRef = useRef<HTMLInputElement>(null);
  

  const verDetallesHandler = (empleado: string) => {
    const item = datos.filter(emp => emp.EmpleadoId === empleado)[0];
    setItemVer(item);
    setShowModalVer(true);
  }

  const closeModalHandler = () =>{
    setShowModalVer(false);
  }

  const searchHandler = () =>{
    if(searchRef.current === null){
      setItemsMatch(datos);
    }else{
      setItemsMatch(datos.filter(i => i.EmpleadoId.startsWith(searchRef.current!.value)))
    }
  }

  return (
    <Modal
      closeModal={() => props.toggleModalHandler(false)}
    >
      <input type="text" style={{width: "40%", marginBottom: "2em"}} ref={searchRef} 
            placeholder= "Ingrese un CUIL" onChange={searchHandler} />
      {itemsMatch.length > 0 && <table style={{width: "100%"}}>
        <thead>
          <tr>
            <th>CUIL</th>
            <th>Total haberes</th>
            <th>Total deducciones</th>
            <th>Total neto</th>
            <th>Códigos</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {itemsMatch &&
            itemsMatch.map((item) => (
              <tr key={item.EmpleadoId}>
                <td>{item.EmpleadoId}</td>
                <td>{item.TotHaberes}</td>
                <td>{item.TotDeducciones}</td>
                <td>{item.TotNeto}</td>
                <td>{item.Codigos?.length}</td>
                <td>
                  <ButtonC textButton={"Ver"} onClickHandler={ ()=>verDetallesHandler(item.EmpleadoId) } width={"80px"} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>}
      {showModalVer && <ModalVer closeModal={closeModalHandler} itemVer={itemVer!}/>}
      <div style={{marginTop: "3em"}}>
            <ButtonC textButton={"Cerrar"} onClickHandler={() => props.toggleModalHandler(false) } width={"250px"} />
        </div>
    </Modal>
  );
};

export default ModalRevisar;
