import classes from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { GetItems, IsLogged } from "../../Utils/SessionHandler";
import { useAppDispatch, useAppSelector } from "../../Hooks/redux-hooks";
import { setUser } from "../../Storage/User-actions";
import { setShowContent } from "../../Storage/UI-actions";
import { setChange } from "../../Storage/Liquidacion-actions";
import { closeSubmenu, showSubmenu } from "../../Storage/Submenu-actions";
import Submenu from "./Submenu";
import { useOutsideAlerter } from "../../Services/Submenu-service";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const showContent = useAppSelector(state => state.ui.showContent);
  const submenu = useAppSelector((state) => state.submenu);
  const [stateShow, setStateShow] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const inis = `${user.nombre[0] || ""}${user.apellido[0] || ""}` ;

  useOutsideAlerter(wrapperRef, submenu, dispatch);

  const navigateHomeHandler = () => {
    navigate("/");
  }

  const onClickSubmenu = () => {
    if (!submenu.showSubmenu) dispatch(showSubmenu());
    else dispatch(closeSubmenu());
  }

  useEffect(()=>{
    if(IsLogged() && user.cuil === "" ){
      const id = GetItems().cuil;
      dispatch(setUser(id, navigate));
      dispatch(setShowContent(true))
      dispatch(setChange(true))
    }
  }, [user.cuil, dispatch, showContent, navigate]);

  useEffect(()=>{

    setStateShow(submenu.showSubmenu)

  }, [submenu.showSubmenu]);


  return (
    <>{showContent && <div className={classes.header}>
    <div className={classes.header_div} onClick={navigateHomeHandler}>
      <div>
        <div className={classes.div_home} >
          <FontAwesomeIcon icon={faHouse} style={{fontSize: "2rem"}}  />
        </div>
      </div>
      <div className={classes.logo}>
        <p>{user.empresa}</p>
      </div>
    </div>
    <div className={classes.header_right}>
      <div className={classes.user}>
        <p className={classes.username}>
          <span>{user.nombre == null ? "" : user.nombre + " "}</span>
          <span>{user.apellido || ""}</span>
        </p>
        <p className={classes.empresa}>
          Empresa: <span>{user.empresa}</span>
        </p>
      </div>
      <div
        className={classes.header_circulo}
        onClick={onClickSubmenu}
        ref={wrapperRef}
      >
        <p>{inis}</p>
      </div>
      {stateShow && <Submenu ref={wrapperRef} />}
    </div>
  </div>}</>
  );
};

export default Header;
