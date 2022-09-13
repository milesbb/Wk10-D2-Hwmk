import { FormControl, InputGroup, ListGroup } from "react-bootstrap";
import SingleBook from "./SingleBook";
import { useState } from "react";
import WarningSign from "./WarningSign";
import CommentArea from "./CommentArea";

const BookList = (props) => {
  // declares and assigns empty string 'query' to state
  // state = {
  //   query: "",
  //   bookAsin: "",
  // };

  const [query, setQuery] = useState({ query: "", bookAsin: "" });

  const changeBook = (book) => {
    setQuery({ ...query, bookAsin: book });
    console.log("book list test", query.bookAsin);
  };

  // declares and assigns imported books array into 'booksDisplay' array
  let booksDisplay = props.books;

  // filters imported books array with query variable (non-case sensitive) and assigns it to booksDisplay
  const filterBooks = () => {
    console.log("filtering...");
    if (query.query) {
      // create filtered books array
      booksDisplay = props.books;
      booksDisplay = props.books.filter(
        (book) =>
          book.title.toLowerCase().includes(query.query.toLowerCase()) === true
      );
      console.log(query.query);
      console.log(booksDisplay);
    } else {
      // end function early if no query set
      booksDisplay = props.books;
      return;
    }
  };

  // assigns value of search bar to query variable on change of value and reloads books
  const onKeyEnter = (event) => {
    filterBooks();
    setQuery({ ...query, query: event.target.value });
    filterBooks();
  };

  // if there are 0 results, displays bootstrap react 'danger' alert WarningSign component
  if (booksDisplay.length < 1) {
    return (
      <div className="w-100 m-auto">
        <InputGroup className="mb-3 w-75 mx-auto">
          <FormControl
            placeholder="Search for books"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={query.query}
            onChange={onKeyEnter}
          />
        </InputGroup>

        <WarningSign text="No books found" />
      </div>
    );
  } else if (query.query === "") {
    // if query field is empty, display all books
    return (
      <div className="w-100 m-auto">
        <InputGroup className="mb-3 w-75 mx-auto">
          <FormControl
            placeholder="Search for books"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={query.query}
            onChange={onKeyEnter}
          />
        </InputGroup>
        <div>
          <ListGroup className="w-50">
            {props.books.map((book, i) => (
              <SingleBook key={i} book={book} changeBook={changeBook} />
            ))}
          </ListGroup>
          <CommentArea asin={query.bookAsin} />
        </div>
      </div>
    );
  } else {
    // if there are results, returns results using mapped SingleBook components
    return (
      <div className="w-100 m-auto">
        <InputGroup className="mb-3 w-75 mx-auto">
          <FormControl
            placeholder="Search for books"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={query.query}
            onChange={onKeyEnter}
          />
        </InputGroup>

        <div>
          <ListGroup className="w-50">
            {booksDisplay.map((book, i) => (
              <SingleBook key={i} book={book} changeBook={changeBook} />
            ))}
          </ListGroup>
          <CommentArea asin={query.bookAsin} />
        </div>
      </div>
    );
  }
};

export default BookList;
