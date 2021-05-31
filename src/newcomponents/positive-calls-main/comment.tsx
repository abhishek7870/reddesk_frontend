import React, { useEffect } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  getPositiveCallsComments,
  addPositiveCallComment,
} from "../../actions/positiveCallsActions";
import { isEmpty } from "../../helpers/isEmpty";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: "800px",
  },
}));

type ModalProps = {
  open: boolean;
  setOpen: Function;
  leadId: number;
  getPositiveCallsComments: Function;
  addPositiveCallComment: Function;
  todays_positive_calls: any;
  loading: boolean;
};

const CommentsModal: React.FC<ModalProps> = ({
  open,
  setOpen,
  leadId,
  getPositiveCallsComments,
  addPositiveCallComment,
  todays_positive_calls,
  loading,
}) => {
  const classes = useStyles();

  const [comment, setComment] = React.useState<string>("");

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (leadId !== 0) {
      getPositiveCallsComments(leadId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadId]);

  const submitForm = async (e: any) => {
    e.preventDefault();
    if (comment === "") {
      return;
    } else {
      let body = {
        comment,
        callId: leadId,
      };
      await addPositiveCallComment(body);
      setComment("");
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2
              style={{
                marginBottom: "10px",
                textAlign: "center",
                borderBottom: "1px solid rgba(0,0,0,0.5)",
              }}
              id="transition-modal-title"
            >
              Add Comments
            </h2>
            <div
              id="transition-modal-description"
              className="modal-form-wrapper"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div className="comment-history">
                {loading
                  ? "Please Wait"
                  : !isEmpty(todays_positive_calls) &&
                    todays_positive_calls.comments &&
                    todays_positive_calls.comments.length > 0
                  ? todays_positive_calls.comments.map((comment: any) => (
                      <p>
                        {comment.created_at.substring(0, 10)} :{" "}
                        {comment.created_at.substring(11, 19)} :{" "}
                        {comment.by_user} : {comment.comment}:{" "}
                        {comment?.sub_category}: {comment?.fix_comment}
                      </p>
                    ))
                  : ""}
              </div>
              <form className="modal-form chat-form" onSubmit={submitForm}>
                <TextareaAutosize
                  aria-label="minimum height"
                  rowsMin={3}
                  placeholder="Add Comment.."
                  value={comment}
                  onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
                    setComment(e.target.value as string)
                  }
                  style={{ width: "80%", marginRight: "10px" }}
                />
                <button style={{ width: "20%" }}>
                  <p>
                    {loading ? (
                      <CircularProgress style={{ color: "#fff" }} size={24} />
                    ) : (
                      "Add Comment"
                    )}
                  </p>
                </button>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  todays_positive_calls: state.positiveCallsReducer.todays_positive_calls,
  loading: state.positiveCallsReducer.loading,
});

export default connect(mapStateToProps, {
  getPositiveCallsComments,
  addPositiveCallComment,
})(CommentsModal);
