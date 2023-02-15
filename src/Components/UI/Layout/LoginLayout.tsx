import React, { ReactNode } from "react";
import classes from "./LoginLayout.module.css"

const LoginLayout: React.FC<{children: ReactNode}> = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.form}>
        {props.children}
      </div>
    </div>
  );
};

export default LoginLayout;
