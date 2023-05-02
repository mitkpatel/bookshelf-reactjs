import React, { useState } from "react";
import "../App.css";

function Search(props) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSearch(query);
  };

  return (
    <div className="col-lg-5 col-md-5 col-sm-12 p-5  pb-3">
      <form onSubmit={handleSubmit} className="d-flex">
        <div className="input-group">
          <label htmlFor="search" className="visually-hidden">
            Search books:
          </label>
          <input
            type="text"
            id="search"
            className="form-control"
            placeholder="Search for a book"
            value={query}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
