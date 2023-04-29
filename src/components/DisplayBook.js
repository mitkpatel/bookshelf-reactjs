import { useState, useEffect, React } from "react";

const DisplayBook = () => {
  const [books, setBooks] = useState([]);
  const [sorting, setSorting] = useState({
    title: { order: "asc" },
    publishYear: { order: "asc" },
  });
  const [searchValue, setSearchValue] = useState("");
  const columns = ["Title", "Book Cover", "Author", "Published Date"];

  const sortTable = (newSorting) => {
    setSorting(newSorting);
    const { column, order } = newSorting;
    const sortedBooks = [...books];
    console.log("col", order);
    sortedBooks.sort((a, b) => {
      if (column === "title") {
        if (order === "asc") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      } else if (column === "first_publish_year") {
        if (order === "asc") {
          return a.first_publish_year - b.first_publish_year;
        } else {
          return b.first_publish_year - a.first_publish_year;
        }
      } else {
        return 0;
      }
    });

    setBooks(sortedBooks);
  };

  const searchTable = (newSearchValue) => {
    setSearchValue(newSearchValue);
  };

  useEffect(() => {
    const url = `https://openlibrary.org/search.json?q=${searchValue}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.docs);
      })
      .catch((error) => console.log(error));
  }, [searchValue]);

  const HeaderCell = ({ column, sorting, sortTable }) => {
    const isDescSorting =
      (sorting.column === column.toLowerCase() ||
        sorting.column === "first_publish_year") &&
      sorting.order === "desc";
    const isAscSorting =
      (sorting.column === column.toLowerCase() ||
        sorting.column === "first_publish_year") &&
      sorting.order === "asc";
    const futureSortingOrder = isDescSorting ? "asc" : "desc";
    const arrow = isDescSorting ? "▼" : "▲";

    const handleClick = () => {
      if (column === "Title") {
        sortTable({
          column: "title",
          order: futureSortingOrder,
          type: "string",
        });
      } else if (column === "Published Date") {
        sortTable({
          column: "first_publish_year",
          order: futureSortingOrder,
          type: "number",
        });
      }
    };

    return (
      <th
        key={column}
        className="px-2 py-3 sm:px-4 sm:py-4 md:px-6 md:py-3 first:rounded-tl-md last:rounded-tr-md cursor-pointer"
        onClick={handleClick}
      >
        {column}
        {console.log("Publicsh", isDescSorting, isAscSorting, column)}
        {isDescSorting || isAscSorting ? (
          <span className="ml-1">{arrow}</span>
        ) : (
          ""
        )}
      </th>
    );
  };
  const Header = ({ columns, sorting, sortTable }) => {
    const toggleOrder = (column) => {
      if (sorting.column === column) {
        setSorting({
          column,
          order: sorting.order === "asc" ? "desc" : "asc",
        });
      } else {
        setSorting({ column, order: "asc" });
      }
    };

    return (
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-100">
        <tr className="text-center">
          {columns.map((column) => (
            <HeaderCell
              key={column}
              column={column}
              sorting={sorting}
              sortTable={sortTable}
              toggleOrder={toggleOrder}
            />
          ))}
        </tr>
      </thead>
    );
  };

  const Content = ({ entries }) => {
    return (
      <tbody>
        {entries.map((record) => (
          <tr key={record.key}>
            <td className="p-4 border">{record.title}</td>
            <td className="p-4 border">
              {record.cover_i && (
                <img
                  src={`http://covers.openlibrary.org/b/id/${record.cover_i}-M.jpg`}
                  alt={record.title}
                  className="max-h-24 border"
                />
              )}
            </td>
            <td className="p-4 border">
              {record.author_name && record.author_name.join(", ")}
            </td>
            <td className="p-4 border">
              {record.publish_date && record.publish_date.join(", ")}
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  const SearchBar = ({ searchTable }) => {
    const [searchValue, setSearchValue] = useState("");
    const handleSubmit = (e) => {
      e.preventDefault();
      searchTable(searchValue);
      setSearchValue("");
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center"
      >
        <input
          type="search"
          className="w-full sm:w-1/2 px-4 py-2 rounded-md border-black border-2 text-gray-800 my-2 sm:mr-3"
          placeholder="Search by book name..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className="bg-blue-500 w-full sm:w-20 h-12 text-white rounded-lg my-2 sm:my-0 sm:mx-3"
          onClick={handleSubmit}
        >
          Search
        </button>
      </form>
    );
  };

  return (
    <div className="w-full text-center p-4">
      <p className="text-xl font-bold">List of books</p>
      <SearchBar searchTable={searchTable} />
      <p className="text-md font-bold mt-3 text-start my-2">
        To sort by Title and Publish date, just click on column name
      </p>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md border">
          <Header columns={columns} sorting={sorting} sortTable={sortTable} />
          <Content entries={books} />
        </table>
      </div>
    </div>
  );
};

export default DisplayBook;
