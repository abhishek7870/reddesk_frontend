import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import AudioPlayer from "material-ui-audio-player";

const muiTheme = createMuiTheme({});

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
    // minWidth: "800px",
  },
}));

type ModalProps = {
  open: boolean;
  setOpen: Function;
  leadId: number;
  url: string;
};

const PlayModel: React.FC<ModalProps> = ({ open, setOpen, leadId, url }) => {
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
            {/* <h2
              style={{
                marginBottom: "10px",
                textAlign: "center",
                borderBottom: "1px solid rgba(0,0,0,0.5)",
              }}
              id="transition-modal-title"
            >
              Recording
            </h2> */}
            <div
              id="transition-modal-description"
              className="modal-form-wrapper"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div className="recorder" style={{ marginTop: "10px" }}>
                <ThemeProvider theme={muiTheme}>
                  <AudioPlayer src={url} />
                </ThemeProvider>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default PlayModel;
