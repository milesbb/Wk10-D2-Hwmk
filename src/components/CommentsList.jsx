import { Component } from "react";
import { ListGroup } from "react-bootstrap";

class CommentsList extends Component {
    componentDidMount = () => {
        console.log("TEST COMMENTS LIST LOG:")
        console.log(this.props.importComments)
      };

  render() {
    return (
      <ListGroup>
        {this.props.importComments.map((elem) => { return <ListGroup.Item key={elem._id}>Rating: {elem.rate} | {elem.comment}</ListGroup.Item>
        })}
      </ListGroup>
    );
  }
}

export default CommentsList;
