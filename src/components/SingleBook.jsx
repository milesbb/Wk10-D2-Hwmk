import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import MyBadge from "./MyBadge";

const SingleBook = (props) => {
  const [selected, setSelected] = useState(false);

  // toggles state of 'selected' when SingleBook component is clicked
  const selectItem = (e) => {
    console.log("Book titled '" + props.book.title);
    setSelected(!selected);
    console.log("selected?: " + selected);
    props.changeBook(props.book.asin);
  };

  // if selected is true, component is rendered with badge
  return (
    <ListGroup.Item style={{ background: selected ? "#cff0ce" : "white" }}>
      {selected && <MyBadge text="selected" color="green" />}
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
            background: selected ? "#cff0ce" : "white",
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
};

export default SingleBook;
