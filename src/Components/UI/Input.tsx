import { forwardRef } from "react";
import classes from "./Input.module.css";

type Props = {
  legend: string;
  type: string|null;
  value: string | null;
}

const Input = forwardRef<HTMLInputElement, Props>(({legend, type, value}, ref) => {
  return (
    <fieldset className={classes.fieldset}>
      <legend className={classes.legend}>
        {legend}
      </legend>
      <input
          ref={ref}
          type={type || 'text'}
          defaultValue={value ?? ""}
          className={classes.input}
      />
    </fieldset>
  );
});
  
  export default Input;