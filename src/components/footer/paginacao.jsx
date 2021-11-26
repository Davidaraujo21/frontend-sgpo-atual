import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './paginacao.css'

function Paginação(){
    return(
        <div className="Paginação">
            <Pagination aria-label="Page">
            <PaginationItem disabled>
                <PaginationLink first href="#" />
            </PaginationItem>
            <PaginationItem disabled>
                <PaginationLink previous href="#" />
            </PaginationItem>
            <PaginationItem active>
                <PaginationLink href="#">
                1
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">
                2
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">
                3
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink next href="#" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink last href="#" />
            </PaginationItem>
            </Pagination>
        </div>
    );
}

export default Paginação;