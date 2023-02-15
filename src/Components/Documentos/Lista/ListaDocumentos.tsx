import ListaDocumentosHeader from "./ListaDocumentosHeader";
import ListItems from "./ListItems";
import classes from "./ListaDocumentos.module.css";

const ListaDocumentos = () => {
  return (
    <div className={classes.container}>
      <ListaDocumentosHeader />
      <ListItems />
    </div>
  );
};

export default ListaDocumentos;
