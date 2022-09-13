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

  const [commentState, setCommentState] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [errorState, setErrorOccurred] = useState([
    true,
    "info",
    "Click a book to load comments!",
  ]);

  const fetchComments = async (asinCode) => {
    setLoadingState(true);
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
        const comments = await response.json();
        if (comments.length === 0) {
          console.log("no comments");
          setErrorOccurred([true, "info", "No Comments Yet"]);
          setLoadingState(false);
        }
        if (comments.length > 200) {
          setErrorOccurred([true, "info", "Click a book to load comments!"]);
          setLoadingState(false);
        } else {
          console.log("Book ID", props.asin)
          console.log(comments)
          setErrorOccurred([false, "", ""]);
          setCommentState(comments);
        }
      } else {
        console.log("Fetch error occurred");
        setErrorOccurred([true, "danger", "Unable to retrieve data"]);
        setLoadingState(false);
      }
    } catch (error) {
      console.log("Base Fetch error occurred");
      setErrorOccurred([true, "danger", "Problem with fetch"]);
      setLoadingState(false);
    } finally {
      setLoadingState(false);
    }
  };

  // const componentDidMount = () => {
  //     this.fetchComments();
  // };
  // let previousProp;
  useEffect(() => {
    // previousProp = 0;
    // fetchComments(props.asin);
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
    // console.log("com area updated");
    // console.log("update checker state", commentState.bookAsin);
    // console.log("update checker props", props.asin);
    // if (previousProp !== props.asin) {
    // setCommentState({ ...commentState, bookAsin: props.asin });
    fetchComments(props.asin);
    // previousProp = props.asin;
    // }
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

      {loadingState === true && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {errorState[0] === true && (
        <Alert className="m-1" variant={errorState[1]}>
          {errorState[2]}
        </Alert>
      )}

      {loadingState === false && errorState[0] === false && (
        <CommentsList importComments={commentState} />
      )}

      {loadingState === false &&
        (errorState[2] === "No Comments Yet" || errorState[0] === false) && (
          <AddComment asin={props.asin} />
        )}
    </div>
  );
};

export default CommentArea;
