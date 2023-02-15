import {
  faLock,
  faEnvelope,
  faShield,
  faInfoCircle,
  faArrowRightFromBracket,
  faUpload,
  faEye,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { forwardRef } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/redux-hooks";
import { closeModal } from "../../Storage/Submenu-actions";
import ItemSubmenuType from "../../Types/ItemSubmenuType";
import Modal from "../UI/Modal/Modal";
import AjusteSeguridad from "./FormsConfiguraciones/AjusteSeguridad";
import EditarClave from "./FormsConfiguraciones/EditarClave";
import EditarMail from "./FormsConfiguraciones/EditarMail";
import ItemSubmenu from "./ItemSubmenu";
import classes from "./Submenu.module.css";

const clave: ItemSubmenuType = {
  ico: faLock,
  title: "Editar clave",
  tipo: 1,
};

const email: ItemSubmenuType = {
  ico: faEnvelope,
  title: "Editar email",
  tipo: 2,
};

const seguridad: ItemSubmenuType = {
  ico: faShield,
  title: "Ajustes de seguridad",
  tipo: 3,
};

const privacidad: ItemSubmenuType = {
  ico: faInfoCircle,
  title: "Aviso de privacidad",
  tipo: 4,
};

const salir: ItemSubmenuType = {
  ico: faArrowRightFromBracket,
  title: "Salir",
  tipo: 5,
};

const importLiqui: ItemSubmenuType = {
  ico: faUpload,
  title: "Importar",
  tipo: 6,
};

const verLiqui: ItemSubmenuType = {
  ico: faEye,
  title: "Ver",
  tipo: 7,
};

const tipoLiquidacion: ItemSubmenuType = {
  ico: faList,
  title: "Tipo Liquidación",
  tipo: 8,
};

const Submenu = forwardRef<HTMLDivElement>(({}, ref) => {
  const role = useAppSelector((state) => state.user.role);
  const stateSubmenu = useAppSelector((state) => state.submenu);
  const stateModal = stateSubmenu.showModal;
  const dispatch = useAppDispatch();

  const closeModalHanlder = () => {
    dispatch(closeModal());
  };

  return (
    <div ref={ref} className={classes.submenu}>
      {role === "ADMIN" && <ItemSubmenu propsItem={importLiqui} />}
      {role === "ADMIN" && <ItemSubmenu propsItem={verLiqui} />}
      {role === "ADMIN" && <ItemSubmenu propsItem={tipoLiquidacion} />}
      <ItemSubmenu propsItem={clave} />
      <ItemSubmenu propsItem={email} />
      <ItemSubmenu propsItem={seguridad} />
      <ItemSubmenu propsItem={privacidad} />
      <ItemSubmenu propsItem={salir} />
      {stateModal && (
        <Modal closeModal={closeModalHanlder}>
          {stateSubmenu.typeForm === 1 && (
            <EditarClave closeModal={closeModalHanlder} />
          )}
          {stateSubmenu.typeForm === 2 && <EditarMail  closeModal={closeModalHanlder} />}
          {stateSubmenu.typeForm === 3 && <AjusteSeguridad closeModal={closeModalHanlder} />}
        </Modal>
      )}
    </div>
  );
});
export default Submenu;
