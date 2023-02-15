import classes from "./ButtonE.module.css";

const ButtonE: React.FC<{
  textButton: string;
  onClickHandler: () => void;
  width: string | null;
}> = (props) => {
  return (
    <button
      className={classes.button}
      onClick={props.onClickHandler}
      style={{ width: props.width || "100px" }}
    >
      {props.textButton}
    </button>
  );
};

export default ButtonE;
