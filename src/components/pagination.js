import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  console.log(postsPerPage,totalPosts,paginate);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <tr>
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} className='page-link' style={{backgroundColor: number == currentPage? "#007bff":"", color: number == currentPage? "white":"" }}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
    </tr>
  );
};

export default Pagination;