import React from 'react';
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow, MDBContainer } from "mdbreact";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  console.log(postsPerPage, totalPosts, paginate);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <MDBContainer className="center-element">
      <MDBPagination circle>
        {pageNumbers.map(number => (
          <MDBPageItem key={number}>
            <MDBPageNav onClick={() => paginate(number)} style={{ backgroundColor: number == currentPage ? "#007bff" : "", color: number == currentPage ? "white" : "" }}>
              {number}
            </MDBPageNav>
          </MDBPageItem>
        ))}
      </MDBPagination>
    </MDBContainer>
  );
};

export default Pagination;