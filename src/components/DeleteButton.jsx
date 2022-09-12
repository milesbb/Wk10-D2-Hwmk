import { Component } from "react";
import { Button } from "react-bootstrap";


class DeleteButton extends Component {

    deleteComment = async (commentID) => {
        const response = await fetch(
          "https://striveschool-api.herokuapp.com/api/comments/" + this.props.id,
          {
            method: "DELETE",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA3NmUyOTFlYjc2ZDAwMTUxNTAxODQiLCJpYXQiOjE2NjI2Mzk5ODgsImV4cCI6MTY2Mzg0OTU4OH0.oDLXqd8WvOSuqLNbrYK69IsRzsnEkOgH2zzpvNtWcPs",
            },
          }
        ).then(alert("comment deleted! refresh page"));
      };

    render() {
        return (
            <Button
                onClick={this.deleteComment}
                className="deleteButton"
                variant="danger"
              >
                Delete
              </Button>
        )
    }
}

export default DeleteButton