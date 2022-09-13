import "./listitems.css";
import { ListGroup } from "react-bootstrap";
import DeleteButton from "./DeleteButton";

const CommentsList = (props) => {
  return (
    <ListGroup>
      {props.importComments.map((elem) => {
        return (
          <ListGroup.Item className="commentItem" key={elem._id}>
            Rating: {elem.rate} | {elem.comment} <DeleteButton id={elem._id} />
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default CommentsList;
