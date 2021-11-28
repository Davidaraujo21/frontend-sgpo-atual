import React from "react";
import ReactPaginate from "react-paginate";
import "./styles.css";

const Pagination = ({handlePageClick, pageCount, itemsPerPage}) => {

  return (
    <>
      <div className="dataTables_paginate paging_simple_numbers">
        <ReactPaginate
          activeClassName="active"
          containerClassName="pagination"
          breakLabel="..."
          nextLabel="Próximo"
          onPageChange={handlePageClick}
          pageCount={Math.ceil(pageCount / itemsPerPage)}
          pageRangeDisplayed={5}
          previousLabel="Anterior"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default React.memo(Pagination);
