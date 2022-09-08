import { Component } from "react";
import { ListGroup } from "react-bootstrap";
import CommentArea from "./CommentArea";
import MyBadge from "./MyBadge";

class SingleBook extends Component {
  // declares and assigns 'selected' boolean within state
  state = {
    selected: false,
  };

  // toggles state of 'selected' when SingleBook component is clicked
  selectItem = (e) => {
    console.log("Book titled '" + this.props.book.title);
    this.setState({
      selected: !this.state.selected,
    });
    console.log("selected?: " + this.state.selected);
  };

  render() {
    if (this.state.selected) {
      // if selected is true, component is rendered with badge
      return (
        <ListGroup.Item
          onClick={this.selectItem}
          style={{ background: "#cff0ce" }}
        >
          <MyBadge text="selected" color="green" />
          <div
            style={{
              backgroundImage: `url("${this.props.book.img}")`,
              backgroundRepeat: "no-repeat",
              objectFit: "contain",
              backgroundSize: "300px",
              height: 400,
              margin: "auto",
            }}
          >
            <div
              style={{
                background: "#cff0ce",
                position: "absolute",
                left: "30%",
                top: "40%",
                fontSize: "2rem",
                textAlign: "left",
              }}
            >
              {this.props.book.title}
            </div>
            <CommentArea asin={this.props.book.asin} />
          </div>
        </ListGroup.Item>
      );
    } else {
      // if selected is false, component is rendered without badge
      return (
        <ListGroup.Item onClick={this.selectItem}>
          <div
            style={{
              backgroundImage: `url("${this.props.book.img}")`,
              backgroundRepeat: "no-repeat",
              objectFit: "contain",
              backgroundSize: "300px",
              height: 400,
              margin: "auto",
            }}
          >
            <div
              style={{
                background: "white",
                position: "absolute",
                left: "30%",
                top: "40%",
                fontSize: "2rem",
                textAlign: "left",
              }}
            >
              {this.props.book.title}
            </div>
          </div>
        </ListGroup.Item>
      );
    }
  }
}

export default SingleBook;
