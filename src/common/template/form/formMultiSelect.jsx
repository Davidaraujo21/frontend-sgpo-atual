import FormMultiSelectItems from "./fomMultiSelectItems"

const MultiSelect = ({toggle, label, del, items, descricaoLabel}) =>{
    return(
        <>
             <div className="div-multiselect">
                <label htmlFor="">{label}</label>
                <button
                  type="button"
                  className="btn btn-info btn-sm"
                  onClick={toggle}
                >
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
              </div>
              <div className="local-items">
                {items.map((item) => (
                  <FormMultiSelectItems label={item[descricaoLabel]} id={item.id} del={() => del(item.id)} urlPath={item.arquivo}/>
                ))}
              </div>
        </>
    )
}


export default MultiSelect