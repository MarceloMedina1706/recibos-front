import DatosRevisarType from "../../Types/DatosRevisarType";
import ButtonC from "../UI/Buttons/ButtonC";
import Modal from "../UI/Modal/Modal";
import classes from "./ModalVer.module.css";

const ModalVer: React.FC<{itemVer: DatosRevisarType, closeModal: ()=>void}> = (props) => {
    const itemVer = props.itemVer;
    return (
        <Modal closeModal={props.closeModal}>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th>CUIL</th>
                        <th>Descripción</th>
                        <th>Categoría</th>
    
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{itemVer.EmpleadoId}</td>
                        <td>{itemVer.Descripcion}</td>
                        <td>{itemVer.Categoria}</td>
                    </tr>
                </tbody>
            </table>
            <table className={`${classes.table} ${classes.margin_table}`}>
                <thead>
                    <tr>
                        <th>Sueldo Básico</th>
                        <th>Fec. Ult. Dep</th>
                        <th>Banco</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{itemVer.SueldoBasico}</td>
                        <td>{itemVer.FecUltDep}</td>
                        <td>{itemVer.Banco}</td>
                    </tr>
                </tbody>
            </table>
            <table className={`${classes.table} ${classes.margin_table}`}>
                <thead>
                    <tr>
                        <th>Total haberes</th>
                        <th>Total deducciones</th>
                        <th>Total neto</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{itemVer.TotHaberes}</td>
                        <td>{itemVer.TotDeducciones}</td>
                        <td>{itemVer.TotNeto}</td>
                    </tr>
                </tbody>
            </table>
            <table className={`${classes.table_codigos} ${classes.margin_table}`}>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Cantidad</th>
                        <th>Porcentaje</th>
                        <th>Importe</th>
                        <th>Descripción</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {itemVer.Codigos.map(cod => 
                        <tr key={cod.Codigo}>
                            <td>{cod.Codigo}</td>
                            <td>{cod.Cantidad}</td>
                            <td>{cod.Porcentaje}</td>
                            <td>{cod.Importe}</td>
                            <td>{cod.CodDescripcion}</td>
                            <td>{cod.CodTipo}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div style={{marginTop: "3em"}}>
                <ButtonC textButton={"Cerrar"} onClickHandler={props.closeModal } width={"250px"} />
            </div>
        </Modal> );
};

export default ModalVer;