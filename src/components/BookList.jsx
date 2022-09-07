import { Button, FormControl, InputGroup, ListGroup } from "react-bootstrap";
import SingleBook from "./SingleBook";
import books from "../books/history.json";
import { Component } from "react";
import WarningSign from "./WarningSign";

class BookList extends Component {
  // declares and assigns empty string 'query' to state
  state = {
    query: "",
  };

  // declares and assigns imported books array into 'booksDisplay' array
  booksDisplay = books;

  // filters imported books array with query variable (non-case sensitive) and assigns it to booksDisplay
  filterBooks = () => {
    console.log("filtering...");
    if (this.state.query) {
      // create filtered books array
      this.booksDisplay = books;
      this.booksDisplay = books.filter(
        (book) =>
          book.title.toLowerCase().includes(this.state.query.toLowerCase()) ===
          true
      );
      console.log(this.state.query);
      console.log(this.booksDisplay);
    } else {
      // end function early if no query set
    //   this.setState({query: ""});
      this.booksDisplay = books;
      return;
    }
  };

  // assigns value of search bar to query variable on change of value and reloads books
  onKeyEnter = (event) => {
    this.filterBooks();
    this.setState({ query: event.target.value });
    this.filterBooks();
  };

  render() {
    // if there are 0 results, displays bootstrap react 'danger' alert WarningSign component
    if (this.booksDisplay.length < 1) {
      return (
        <div className="w-75 m-auto">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search for books"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={this.state.query}
              onChange={this.onKeyEnter}
            />
          </InputGroup>

          <WarningSign text="No books found" />
        </div>
      );
    } else if (this.state.query === "") {
      // if query field is empty, display all books
      return (
        <div className="w-75 m-auto">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search for books"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={this.state.query}
              onChange={this.onKeyEnter}
            />
          </InputGroup>

          <ListGroup>
            {books.map((book, i) => (
              <SingleBook key={i} book={book} />
            ))}
          </ListGroup>
        </div>
      );
    } else {
        // if there are results, returns results using mapped SingleBook components
        return (
          <div className="w-75 m-auto">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search for books"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={this.state.query}
                onChange={this.onKeyEnter}
              />
            </InputGroup>
  
            <ListGroup>
              {this.booksDisplay.map((book, i) => (
                <SingleBook key={i} book={book} />
              ))}
            </ListGroup>
          </div>
        );
      }
  }
}

export default BookList;
