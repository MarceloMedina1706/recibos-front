// @ts-ignore
import pdf from '../Assets/privacidad.pdf';

const Privacidad = () => {
  return (
    <div>
      <iframe
        title="priv"
        src={pdf}
        style={{ width: "100%", height: "84vh" }}
      ></iframe>
    </div>
  );
};

export default Privacidad;
