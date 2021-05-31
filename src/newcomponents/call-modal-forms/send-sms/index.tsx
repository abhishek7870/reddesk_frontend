import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import SendIcon from "@material-ui/icons/Send";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import { getSMSTemplates } from "../../../actions/dashboardActions";
import "./index.sass";

interface Props {
  getSMSTemplates: Function;
}

const SendSMS: React.FC<Props> = ({ getSMSTemplates }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div className="chat-history"></div>
      <form className="modal-form chat-form">
        <TextareaAutosize
          aria-label="minimum height"
          rowsMin={3}
          placeholder="Type your message.."
          style={{ width: "80%", marginRight: "10px" }}
        />
        <button style={{ width: "20%" }}>
          <SendIcon />
        </button>
      </form>
      <div
        className="templates"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="first">
          Templates <ExpandMoreIcon />
        </div>
        <div className="second">
          Center Suggestions <ExpandMoreIcon />
        </div>
      </div>
    </div>
  );
};

export default connect(null, getSMSTemplates)(SendSMS);
