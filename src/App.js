import React, { useState } from "react";
import Search from "./components/Search";
import DisplayBook from "./components/DisplayBook";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const handleSearch = (query) => {
    setIsLoading(true); // Set isLoading to true when search request is made
    fetch(`http://openlibrary.org/search.json?q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.docs);
        setIsLoading(false); // Set isLoading to false when response is received
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // Set isLoading to false if there's an error
      });
  };

  const handleSortTitle = () => {
    const sorted = [...books].sort((a, b) => a.title.localeCompare(b.title));
    setBooks(sorted);
  };

  const handleSortPublished = () => {
    const sorted = [...books].sort(
      (a, b) => b.first_publish_year - a.first_publish_year
    );
    setBooks(sorted);
  };

  return (
    <div className="container">
      <div className="justify-content-center d-flex">
        <Search onSearch={handleSearch} />
      </div>

      {isLoading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!isLoading && books.length > 0 && (
        <div className="mb-5">
          <div className="mt-0 mb-2 bold text-center">
            <b> {books.length} results of records </b>
          </div>
          <div className="d-flex justify-content-center">
            <button
              onClick={handleSortTitle}
              className="btn btn-secondary me-2 mt-0 mb-5"
            >
              Sort by title
            </button>
            <button
              onClick={handleSortPublished}
              className="btn btn-secondary ms-2 mt-0 mb-5"
            >
              Sort by published date
            </button>
          </div>
          <DisplayBook books={books} />
        </div>
      )}
    </div>
  );
}

export default App;
