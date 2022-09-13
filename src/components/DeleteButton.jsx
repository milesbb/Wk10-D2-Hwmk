import { Button } from "react-bootstrap";

const DeleteButton = (props) => {
  const deleteComment = async (commentID) => {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/comments/" + props.id,
      {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA3NmUyOTFlYjc2ZDAwMTUxNTAxODQiLCJpYXQiOjE2NjI2Mzk5ODgsImV4cCI6MTY2Mzg0OTU4OH0.oDLXqd8WvOSuqLNbrYK69IsRzsnEkOgH2zzpvNtWcPs",
        },
      }
    ).then(alert("comment deleted! refresh page"));
  };

  return (
    <Button
      onClick={deleteComment}
      className="deleteButton mt-2"
      variant="danger"
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
