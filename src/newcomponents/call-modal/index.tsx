import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ModelFormSelect from "./modelFormsSelect";
import "./index.sass";

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
    minWidth: "500px",
  },
}));

type ModalProps = {
  heading: string;
  index: number;
  open: boolean;
  setOpen: Function;
};
const CallModal: FunctionComponent<ModalProps> = ({
  heading,
  index,
  open,
  setOpen,
}) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
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
              {heading}
            </h2>
            <div
              id="transition-modal-description"
              className="modal-form-wrapper"
            >
              <ModelFormSelect index={index} setOpen={setOpen} open={open} />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default CallModal;
