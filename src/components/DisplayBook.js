import React, { useState } from "react";
import "../App.css";

function DisplayBook(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = props.books.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="g-4 bg-light p-3">
      <div className="row row-cols-1 row-cols-md-3 ">
        {currentRecords.map((book, index) => (
          <div key={index}>
            <div className="card m-5 mb-0 mt-2">
              <img
                src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
                height="300px"
                className="card-img"
              />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">
                  Author:{" "}
                  {book.author_name ? book.author_name.join(", ") : "Unknown"}
                </p>
                <p className="card-text">
                  Published: {book.first_publish_year || "Unknown"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        recordsPerPage={recordsPerPage}
        totalRecords={props.books.length}
        paginate={paginate}
      />
    </div>
  );
}

export default DisplayBook;

const Pagination = ({
  currentPage,
  recordsPerPage,
  totalRecords,
  paginate,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="Page pb-5">
      <div className="pagination-wrapper me-5">
        <div className="container h-auto flex justify-content-end">
          <ul className="pagination justify-content-end">
            <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={`page-item${
                  currentPage === number ? " active" : ""
                }`}
              >
                <button className="page-link" onClick={() => paginate(number)}>
                  {number}
                </button>
              </li>
            ))}
            <li
              className={`page-item${
                currentPage === pageNumbers.length ? " disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
