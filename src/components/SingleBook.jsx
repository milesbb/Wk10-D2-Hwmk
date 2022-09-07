import { ListGroup } from "react-bootstrap";

const SingleBook = (book) => {
    return (  
        <ListGroup.Item><div style={{backgroundImage: `url("${book.book.img}")`, backgroundRepeat: "no-repeat", objectFit: "contain", backgroundSize: "300px", height: 400, margin: "auto"}}><div style={{background: "white", position: "absolute", left: "30%", top: "40%", fontSize: "2rem", textAlign: "left"}}>{book.book.title}</div></div></ListGroup.Item>
    );
}

export default SingleBook