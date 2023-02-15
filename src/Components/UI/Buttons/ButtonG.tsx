import classes from "./ButtonG.module.css";

const ButtonG: React.FC<{
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
  
  export default ButtonG;