import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { IsLogged } from "../../Utils/SessionHandler";

const RenderOnAnonymous: React.FC<{ children: ReactNode }> = (
  props
) => (!IsLogged() ? <>{props.children}</> : <Navigate to = "/" />);

export default RenderOnAnonymous