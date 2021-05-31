import React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CircularProgress from "@material-ui/core/CircularProgress";
import { addComment } from "../../../../actions/positiveCallsActions";
import { isEmpty } from "../../../../helpers/isEmpty";

import "./index.sass";

const useStyles = makeStyles({
  root: {
    minWidth: "90%",
    background: "#F7F7F7",
    margin: "10px 0",
  },
});

interface Props {
  read_call_details: any;
  addComment: Function;
  loading: boolean;
}

// custom hook for query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CommentHistory: React.FC<Props> = ({
  read_call_details,
  addComment,
  loading,
}) => {
  const classes = useStyles();
  let query = useQuery();
  const [toggleForm, setToggleForm] = React.useState<boolean>(true);
  const [comment, setComment] = React.useState<string>("");

  const submitForm = async () => {
    let body = {
      comment,
      callId: query.get("id"),
    };
    await addComment(body);
    setComment("");
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <div
          className="header-collapse"
          onClick={() => setToggleForm(!toggleForm)}
        >
          Comment History{" "}
          {!toggleForm ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </div>
        <form
          className="form-fields info"
          style={{ display: !toggleForm ? "none" : "block" }}
        >
          <div className="form-elements">
            <div className="comment-history">
              {!isEmpty(read_call_details) &&
              read_call_details.comments.length > 0
                ? read_call_details.comments.map((comment: any) => (
                    <p>
                      {comment.created_at.substring(0, 10)} :{" "}
                      {comment.created_at.substring(11, 19)} : {comment.by_user}{" "}
                      : {comment.comment}
                    </p>
                  ))
                : ""}
            </div>
          </div>
          <div className="form-elements" style={{ display: "flex" }}>
            <TextareaAutosize
              aria-label="minimum height"
              rowsMin={3}
              value={comment}
              onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
                setComment(e.target.value as string)
              }
              placeholder="Add Comment.."
              style={{ width: "80%", marginRight: "10px" }}
            />
            <button
              style={{ width: "20%" }}
              className="add-comment-btn"
              onClick={submitForm}
            >
              <p>
                {loading ? (
                  <CircularProgress style={{ color: "#fff" }} size={24} />
                ) : (
                  "Add Comment"
                )}
              </p>
            </button>
          </div>
        </form>
      </CardContent>
      <CardActions
        style={{ paddingLeft: "16px", display: !toggleForm ? "none" : "block" }}
      ></CardActions>
    </Card>
  );
};

const mapStateToProps = (state: any) => ({
  read_call_details: state.positiveCallsReducer.read_call_details,
  loading: state.positiveCallsReducer.loading,
});

export default connect(mapStateToProps, { addComment })(CommentHistory);
