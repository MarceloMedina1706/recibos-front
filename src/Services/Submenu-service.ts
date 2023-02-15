import { useEffect } from "react";
import { closeSubmenu, setOpenSubmenu } from "../Storage/Submenu-actions";

export function useOutsideAlerter(ref: any, submenu: any, dispatch: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          submenu.showSubmenu &&
          !submenu.openSubmenu &&
          !submenu.showModal
        ) {
          
          dispatch(closeSubmenu());
          return
        }
  
        if(submenu.openSubmenu) dispatch(setOpenSubmenu(false));
      }
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [ref, submenu, dispatch]);
}