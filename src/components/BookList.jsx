import { Button, FormControl, InputGroup, ListGroup } from "react-bootstrap";
import SingleBook from "./SingleBook";
import books from "../books/history.json";
import { Component } from "react";

class BookList extends Component {
  state = {
    query: "",
  };

  booksDisplay = books;

  filterBooks = () => {
    console.log("filtering...");
    if (this.state.query) {
      // create filtered books array
      this.booksDisplay = books;
      this.booksDisplay = books.filter(
        (book) => book.title.toLowerCase().includes(this.state.query.toLowerCase()) === true
      );
      console.log(this.state.query);
      console.log(this.booksDisplay);
      //   this.render();
    } else {
      this.booksDisplay = books;
      // end function early if no query set
      return;
    }
  };

  onKeyEnter = (event) => {
    this.setState({ query: event.target.value });
    this.filterBooks();
    this.filterBooks();
    this.filterBooks();
    this.filterBooks();
  };

  render() {
    return (
      <div className="w-75 m-auto">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search for books"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={this.state.query}
            onChange={
                this.onKeyEnter
                }
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

export default BookList;
