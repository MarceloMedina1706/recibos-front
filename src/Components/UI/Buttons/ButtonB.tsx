import classes from "./ButtonB.module.css";
const ButtonB: React.FC<{
  textButton: string;
  width: string | null;
  onClickHandler: () => void;
}> = (props) => {
  return (
    <button className={classes.button} style={{width: props.width || "100px"}} onClick={props.onClickHandler}>
      {props.textButton}
    </button>
  );
};

export default ButtonB;
