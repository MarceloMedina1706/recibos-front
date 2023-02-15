import classes from "./ListaDocumentosHeader.module.css";

const ListaDocumentosHeader = () => {
    return (
        <div className={classes.header}>
          <div className={classes.title}>
            <p>Mis Documentos</p>
          </div>
          <div className={classes.filter}>
            {/* <p>
              <FontAwesomeIcon icon={faSliders} />
              Filtros
              <FontAwesomeIcon icon={faCaretDown} />
            </p> */}
          </div>
        </div>
      );
};

export default ListaDocumentosHeader;
