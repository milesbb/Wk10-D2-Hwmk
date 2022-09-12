import "./listitems.css";
import { Component } from "react";
import { Button, ListGroup } from "react-bootstrap";
import DeleteButton from "./DeleteButton";

class CommentsList extends Component {
  componentDidMount = () => {
    console.log("TEST COMMENTS LIST LOG:");
    console.log(this.props.importComments);
  };

  render() {
    return (
      <ListGroup>
        {this.props.importComments.map((elem) => {
          return (
            <ListGroup.Item className="commentItem" key={elem._id}>
              Rating: {elem.rate} | {elem.comment}{" "}
              <DeleteButton id={elem._id} />
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}

export default CommentsList;
