import { Badge } from "react-bootstrap";

// badge react bootstrap component to show when a book is selected
const MyBadge = (props) => {
  return (
    <Badge
      variant="secondary"
      style={{
        background: props.color,
        position: "absolute",
        top: 10,
        right: 10,
      }}
    >
      {props.text}
    </Badge>
  );
};

export default MyBadge;
