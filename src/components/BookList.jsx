import { Button, FormControl, InputGroup, ListGroup } from "react-bootstrap";
import SingleBook from "./SingleBook";
import books from "../books/history.json";

const BookList = () => {
  return (
    <div className="w-75 m-auto">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search for books"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary">Search</Button>
        </InputGroup.Append>
      </InputGroup>

      <ListGroup>
        {books.map((book) => <ListGroup.Item><div style={{backgroundImage: `url("${book.img}")`, backgroundRepeat: "no-repeat", objectFit: "contain", backgroundSize: "300px", height: 400, margin: "auto"}}><div style={{background: "white", position: "absolute", left: "30%", top: "40%", fontSize: "2rem", textAlign: "left"}}>{book.title}</div></div></ListGroup.Item> )}
        </ListGroup>
    </div>
  );
};

export default BookList;
