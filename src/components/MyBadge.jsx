import { Component } from "react";
import { Badge } from "react-bootstrap";

// badge react bootstrap component to show when a book is selected
class MyBadge extends Component {
  render() {
    return (
      <Badge
        variant="secondary"
        style={{
          background: this.props.color,
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        {this.props.text}
      </Badge>
    );
  }
}

export default MyBadge;
