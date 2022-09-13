import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import MyBadge from "./MyBadge";

const SingleBook = (props) => {
  // declares and assigns 'selected' boolean within state
  // state = {
  //   selected: false,
  // };

  const [selected, setSelected] = useState({selected: false})

  // toggles state of 'selected' when SingleBook component is clicked
  const selectItem = (e) => {
    console.log("Book titled '" + props.book.title);
    setSelected({
      selected: !selected.selected,
    });
    console.log("selected?: " + selected.selected);
    props.changeBook(props.book.asin);
  };


    if (selected.selected) {
      // if selected is true, component is rendered with badge
      return (
        <ListGroup.Item style={{ background: "#cff0ce" }}>
          <MyBadge text="selected" color="green" />
          <div
            style={{
              backgroundImage: `url("${props.book.img}")`,
              backgroundRepeat: "no-repeat",
              objectFit: "contain",
              backgroundSize: "300px",
              height: 400,
              margin: "auto",
            }}
            onClick={selectItem}
          >
            <div
              style={{
                background: "#cff0ce",
                position: "absolute",
                left: "50%",
                top: "10%",
                fontSize: "2rem",
                textAlign: "left",
                width: "16rem",
              }}
            >
              {props.book.title}
            </div>
          </div>
        </ListGroup.Item>
      );
    } else {
      // if selected is false, component is rendered without badge
      return (
        <ListGroup.Item onClick={selectItem}>
          <div
            style={{
              backgroundImage: `url("${props.book.img}")`,
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
                left: "50%",
                top: "10%",
                fontSize: "2rem",
                textAlign: "left",
                width: "16rem",
              }}
            >
              {props.book.title}
            </div>
          </div>
        </ListGroup.Item>
      );
    }
  
}

export default SingleBook;
