import { Component } from "react";
import { Alert, Button, Spinner } from "react-bootstrap";
import AddComment from "./AddComment";
import CommentsList from "./CommentsList";

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: true,
    errorOccurred: false,
    alert: { variant: "", message: "" },
    formOpen: false,
  };

  fetchComments = async () => {
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
          this.props.asin,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA3NmUyOTFlYjc2ZDAwMTUxNTAxODQiLCJpYXQiOjE2NjI2Mzk5ODgsImV4cCI6MTY2Mzg0OTU4OH0.oDLXqd8WvOSuqLNbrYK69IsRzsnEkOgH2zzpvNtWcPs",
          },
        }
      );

      if (response.ok) {
        const comments = await response.json();
        if (comments.length === 0) {
          console.log("no comments");
          this.setState({
            errorOccurred: true,
            alert: { variant: "info", message: "No Comments Yet" },
          });
        }
        console.log("Book ID:" + this.props.asin);
        console.log("Comments: ");
        console.log(comments);
        this.setState({ comments: comments });
      } else {
        console.log("Fetch error occured");
        this.setState({
          errorOccurred: true,
          alert: { variant: "danger", message: "Unable to retrieve data" },
        });
      }
    } catch (error) {
      console.log("Base Fetch error occured");
      this.setState({
        errorOccurred: true,
        alert: { variant: "danger", message: "Problem with fetch" },
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount = () => {
    this.fetchComments();
  };

  render() {
    return (
      <div
        className="ml-auto w-50 bg-white rounded overflow-auto shadow p-3 bg-white rounded"
        style={{ zIndex: 99, right: 0, bottom: 0, position: "sticky", height: "50rem" }}
      >
        <h3>Comments:</h3>

        {this.state.isLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        {this.state.errorOccurred && (
          <Alert className="m-1" variant={this.state.alert.variant}>
            {this.state.alert.message}
          </Alert>
        )}

        {(!this.state.isLoading || this.state.formOpen) && (this.state.errorOccurred === false) && (
          <CommentsList importComments={this.state.comments} />
        )}

        {(!this.state.isLoading || this.state.formOpen) && (this.state.errorOccurred === false) && (
          <AddComment asin={this.props.asin} />
        )}
      </div>
    );
  }
}

export default CommentArea;
