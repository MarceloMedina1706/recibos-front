import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Hooks/redux-hooks";
import { closeSubmenu, showModal } from "../../Storage/Submenu-actions";
import ItemSubmenuType from "../../Types/ItemSubmenuType";
import { logout, resetStates } from "../../Utils/SessionHandler";
import classes from "./ItemSubmenu.module.css";

const ItemSubmenu: React.FC<{ propsItem: ItemSubmenuType }> = (props) => {
  const propsItem = props.propsItem;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClickItem = () => {
    switch (propsItem.tipo) {
      case 4:
        navigate("/privacidad");
        dispatch(closeSubmenu());
        break;
      case 5:
        logout();
        resetStates(dispatch);
        navigate("/login");
        break;
      case 6:
        navigate("/importar");
        dispatch(closeSubmenu());
        break;
      case 7:
        navigate("/VerLiquidaciones");
        dispatch(closeSubmenu());
        break;
      case 8:
        navigate("/tipoLiquidacion");
        dispatch(closeSubmenu());
        break;
    }

    if(propsItem.tipo === 1 || propsItem.tipo === 2 || propsItem.tipo === 3)
      dispatch(showModal(propsItem.tipo));

    //dispatch(closeSubmenu());
  };
  return (
    <div className={classes.item_submenu} onClick={onClickItem}>
      <FontAwesomeIcon
        icon={propsItem.ico}
        size={"1x"}
        className={classes.ico_color}
        // style={{ color: "rgb(79, 65, 163)" }}
      />
      <p>{propsItem.title}</p>
    </div>
  );
};

export default ItemSubmenu;
