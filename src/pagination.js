import React from "react";

const Pagination = ({ productsPerPage, totalProducts, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          gap: "10px",
          padding: 0,
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              style={{
                padding: "5px 10px",
                backgroundColor: number === currentPage ? "#007bff" : "#f0f0f0",
                color: number === currentPage ? "white" : "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
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
