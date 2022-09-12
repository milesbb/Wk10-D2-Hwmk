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
    bookAsin: "",
  };

  fetchComments = async () => {
    this.setState({errorOccurred: false, isLoading: true});
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
        console.log("Book ID:" + this.state.bookAsin);
        console.log("Comments: ");
        console.log(comments);
        if (comments.length > 200) {
          this.setState({
            errorOccurred: true,
            alert: { variant: "info", message: "Click a book to load comments!" },
            isLoading: false,
          });
        }
        this.setState({ comments: comments });
        
      } else {
        console.log("Fetch error occurred");
        this.setState({
          errorOccurred: true,
          alert: { variant: "danger", message: "Unable to retrieve data" },
        });
      }
    } catch (error) {
      console.log("Base Fetch error occurred");
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

  componentDidUpdate = () => {
    console.log("com area updated");
    console.log("update checker state", this.state.bookAsin);
    console.log("update checker props", this.props.asin);
    if (this.state.bookAsin !== this.props.asin) {
      this.setState({ bookAsin: this.props.asin });
      this.fetchComments();
    }
  };

  render() {
    return (
      <div
        className="ml-auto w-50 bg-white rounded overflow-auto shadow p-3 bg-white rounded"
        style={{
          zIndex: 99,
          right: 0,
          bottom: 0,
          position: "sticky",
          height: "50rem",
        }}
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

        {(!this.state.isLoading || this.state.formOpen) &&
          this.state.errorOccurred === false && (
            <CommentsList importComments={this.state.comments} />
          )}

        {(!this.state.isLoading || this.state.formOpen) &&
          this.state.errorOccurred === false && (
            <AddComment asin={this.state.bookAsin} />
          )}
      </div>
    );
  }
}

export default CommentArea;
