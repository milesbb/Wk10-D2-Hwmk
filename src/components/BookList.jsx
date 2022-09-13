import { FormControl, InputGroup, ListGroup } from "react-bootstrap";
import SingleBook from "./SingleBook";
import { useState } from "react";
import WarningSign from "./WarningSign";
import CommentArea from "./CommentArea";

const BookList = (props) => {
  const [query, setQuery] = useState("");
  const [bookAsin, setBookAsin] = useState("");

  const changeBook = (book) => {
    setBookAsin(book);
    console.log("bookList ID test", bookAsin);
  };

  const filterBooks = () => {
    console.log("filtering...");
    let booksDisplay = props.books;
    if (query) {
      booksDisplay = props.books.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) === true
      );
      console.log(query);
      console.log(booksDisplay);
      return booksDisplay;
    } else {
      // end function early if no query set
      return booksDisplay;
    }
  };

  // assigns value of search bar to query variable on change of value and reloads books
  const onKeyEnter = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="w-100 m-auto">
      <InputGroup className="mb-3 w-75 mx-auto">
        <FormControl
          placeholder="Search for books"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={query}
          onChange={onKeyEnter}
        />
      </InputGroup>

      <div>
        <ListGroup className="w-50">
          {filterBooks().length === 0 && <WarningSign text="No books found" />}
          {filterBooks().map((book, i) => (
            <SingleBook key={i} book={book} changeBook={changeBook} />
          ))}
        </ListGroup>
        <CommentArea asin={bookAsin} />
      </div>
    </div>
  );
};

export default BookList;
