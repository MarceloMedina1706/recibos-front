import { ChangeEvent, forwardRef } from "react";
import classes from "./ButtonFile.module.css";

type Props = {
  textButton: string;
  width: string | null;
  onChangeFile: (e: ChangeEvent<HTMLInputElement>) => void
}

const ButtonFile = forwardRef<HTMLInputElement, Props>(({textButton, width, onChangeFile}, ref) => {
  return (
        <div className={classes.container} >
          <label className={classes.label} style={{padding: `${"5px"} ${width || "50px"}`}} htmlFor="archivo">
            {textButton}
          </label>
          <input type="file" className={classes.input} id="archivo" ref={ref} onChange={onChangeFile} />
        </div>
      );
});

// const ButtonFile: React.FC<{
//   textButton: string;
//   width: string | null;
// }> = (props) => {
//   return (
//     <div className={classes.container} >
//       <label className={classes.label} style={{padding: `${"5px"} ${props.width ||"50px"}`}} htmlFor="archivo">
//         {props.textButton}
//       </label>
//       <input type="file" className={classes.input} id="archivo0" />
//     </div>
//   );
// };

export default ButtonFile;
