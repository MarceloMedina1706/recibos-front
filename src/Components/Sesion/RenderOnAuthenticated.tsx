import { ReactNode, useEffect } from "react";
import {  useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../Hooks/redux-hooks";
import { setChange, setShowContent } from "../../Storage/UI-actions";
import { IsLogged, logout, resetStates } from "../../Utils/SessionHandler";

const RenderOnAuthenticated: React.FC<{ children: ReactNode }> = (
  props
) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const showContent = useAppSelector(s => s.ui.showContent);
  const change = useAppSelector(s => s.ui.change);


  useEffect(()=>{
    if(!IsLogged()) {
      Swal.fire({
        text: "No estas logeado"
      });
        
      navigate("/login");
      //dispatch(resetState());
      logout();
      resetStates(dispatch);
      dispatch(setShowContent(false));
    }else{
      dispatch(setShowContent(true));
      if(change){
        dispatch(setChange(false));
      }
    }

    
  }, [navigate, change, dispatch, location.pathname]);

  return <>{showContent && props.children}</> ;
}

export default RenderOnAuthenticated;
