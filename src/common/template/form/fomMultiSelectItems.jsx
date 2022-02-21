import "./styles.css";

const FormMultiSelectItems = ({ id, label, del, urlPath }) => {
  return (
    <>
      <div className="items" key={id}>
          {label}
        <div>
          {urlPath && (
            <a
              title="Visualizar arquivo"
              href={urlPath}
              target="_blank"
              rel="noreferrer"
              className="btn btn-info btn-sm"
            >
              <i class="fa fa-file" aria-hidden="true"></i>
            </a>
          )}
          <button
            title="Deletar"
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => del(id)}
          >
            <i class="fa fa-times-circle" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default FormMultiSelectItems;
