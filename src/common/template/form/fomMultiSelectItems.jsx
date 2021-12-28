const FormMultiSelectItems = ({ id, label, del }) => {
  return (
    <>
      <div className="items" key={id}>
        {label}
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => del(id)}
        >
          <i class="fa fa-times-circle" aria-hidden="true"></i>
        </button>
      </div>
    </>
  );
};

export default FormMultiSelectItems;
