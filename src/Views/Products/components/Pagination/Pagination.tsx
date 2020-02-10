import React from "react";

interface Props {
  productsPerPage: number;
  totalproducts: number;
  currentPage: number;
  paginate: (n: number) => any;
}

const Pagination: React.FC<Props> = ({
  productsPerPage,
  totalproducts,
  paginate,
  currentPage
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalproducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center ">
        {pageNumbers.map(number => (
          <li
            className={`page-item ${currentPage === number ? "active" : ""}`}
            key={number}
          >
            <button
              type="button"
              className="page-link"
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
