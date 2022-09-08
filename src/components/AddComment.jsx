import { Component } from "react";
import { Button, Form } from "react-bootstrap";

class AddComment extends Component {
  state = {
    comment: {
      comment: "",
      rate: "",
      elementId: (this.props.asin.toString()),
    },
  };

  handleChange = (propertyToSet, valueToSet) => {
    this.setState({
      comment: {
        ...this.state.comment,
        [propertyToSet]: valueToSet,
      },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/",
        {
          method: "POST",
          body: JSON.stringify(this.state.comment),
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA3NmUyOTFlYjc2ZDAwMTUxNTAxODQiLCJpYXQiOjE2NjI2Mzk5ODgsImV4cCI6MTY2Mzg0OTU4OH0.oDLXqd8WvOSuqLNbrYK69IsRzsnEkOgH2zzpvNtWcPs",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("comment added");

        const commentHolder = await response.json();

        console.log(commentHolder);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        comment: {
          comment: "",
          rate: "",
          elementId: this.props.asin,
        },
      });
    }
  };

  render() {
    return (
      <div className="mt-2">
        <h4>Add a comment</h4>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as="select"
              value={this.state.comment.rate}
              onChange={(e) => {
                this.handleChange("rate", e.target.value);
              }}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Comment</Form.Label>
            <Form.Control
            placeholder="Write your comment here!"
              as="textarea"
              rows={3}
              value={this.state.comment.comment}
              onChange={(e) => {
                this.handleChange("comment", e.target.value);
              }}
            />
          </Form.Group>
          <Button className="mt-3" type="submit">Add Comment</Button>
        </Form>
        
      </div>
    );
  }
}

export default AddComment;
