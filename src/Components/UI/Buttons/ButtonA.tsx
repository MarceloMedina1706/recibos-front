import classes from "./ButtonA.module.css";

const ButtonA: React.FC<{textButton: string}> = (props) => {
    return <button className={classes.button} >{props.textButton}</button>
}

export default ButtonA;