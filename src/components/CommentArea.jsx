import { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import AddComment from "./AddComment";
import CommentsList from "./CommentsList";

const CommentArea = (props) => {
  // state = {
  //   comments: [],
  //   isLoading: true,
  //   errorOccurred: false,
  //   alert: { variant: "", message: "" },
  //   formOpen: false,
  //   bookAsin: "",
  // };

  const [commentState, setCommentState] = useState({
    comments: [],
    isLoading: true,
    errorOccurred: false,
    alert: { variant: "", message: "" },
    formOpen: false,
    bookAsin: "",
  });

  let comments;
  const fetchComments = async (asinCode) => {
    setCommentState({ ...commentState, errorOccurred: false, isLoading: true });
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + asinCode,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA3NmUyOTFlYjc2ZDAwMTUxNTAxODQiLCJpYXQiOjE2NjI2Mzk5ODgsImV4cCI6MTY2Mzg0OTU4OH0.oDLXqd8WvOSuqLNbrYK69IsRzsnEkOgH2zzpvNtWcPs",
          },
        }
      );

      if (response.ok) {
        comments = await response.json();
        if (comments.length === 0) {
          console.log("no comments");
          setCommentState({
            ...commentState,
            errorOccurred: true,
            alert: { variant: "info", message: "No Comments Yet" },
          });
        }
        console.log("Book ID:" + asinCode);
        console.log("Comments: ");
        console.log(comments);
        if (comments.length > 200) {
          setCommentState({
            ...commentState,
            errorOccurred: true,
            alert: {
              variant: "info",
              message: "Click a book to load comments!",
            },
            isLoading: false,
          });
        } else {
          setCommentState({ ...commentState, comments: comments });
        }
      } else {
        console.log("Fetch error occurred");
        setCommentState({
          ...commentState,
          errorOccurred: true,
          alert: { variant: "danger", message: "Unable to retrieve data" },
        });
      }
    } catch (error) {
      console.log("Base Fetch error occurred");
      setCommentState({
        ...commentState,
        errorOccurred: true,
        alert: { variant: "danger", message: "Problem with fetch" },
      });
    } finally {
      setCommentState({ ...commentState, isLoading: false });
    }
  };

  // const componentDidMount = () => {
  //     this.fetchComments();
  // };
  let previousProp
  useEffect(() => {
    previousProp = 0
    fetchComments(props.asin);
  }, []);

  // const componentDidUpdate = () => {
  //   console.log("com area updated");
  //   console.log("update checker state", this.state.bookAsin);
  //   console.log("update checker props", this.props.asin);
  //   if (this.state.bookAsin !== this.props.asin) {
  //     this.setState({ bookAsin: this.props.asin });
  //     this.fetchComments();
  //   }
  // };

  

  useEffect(() => {
    console.log("com area updated");
    console.log("update checker state", commentState.bookAsin);
    console.log("update checker props", props.asin);
    if (previousProp !== props.asin) {
      setCommentState({ ...commentState, bookAsin: props.asin });
      fetchComments(props.asin);
      previousProp = props.asin;
    }
  }, [props.asin]);

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

      {commentState.isLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {commentState.errorOccurred && (
        <Alert className="m-1" variant={commentState.alert.variant}>
          {commentState.alert.message}
        </Alert>
      )}

      {(!commentState.isLoading || commentState.formOpen) &&
        commentState.errorOccurred === false && (
          <CommentsList importComments={commentState.comments} />
        )}

      {(!commentState.isLoading || commentState.formOpen) &&
        (commentState.alert.message === "No Comments Yet" ||
          commentState.errorOccurred === false) && (
          <AddComment asin={props.asin} />
        )}
    </div>
  );
};

export default CommentArea;
