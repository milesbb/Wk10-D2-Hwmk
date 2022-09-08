import { Component } from "react";
import { Alert, Spinner } from "react-bootstrap";
import CommentsList from "./CommentsList";

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: true,
    errorOccurred: false,
    alert: { variant: "", message: "" },
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
    // if (this.state.isLoading) {

    // } else if (this.state.)

    return (
      <div className="ml-auto mr-5 w-75 h-25 bg-white position-absolute fixed-bottom rounded overflow-auto shadow p-3 mb-5 bg-white rounded">
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
        {!this.state.isLoading && (
          <CommentsList importComments={this.state.comments} />
        )}
      </div>
    );
  }
}

export default CommentArea;
