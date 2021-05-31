import React, { useState } from "react";
import CallModal from "../call-modal";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import WarningIcon from "@material-ui/icons/Warning";
import CallIcon from "@material-ui/icons/Call";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import { connect } from "react-redux";

interface Props {
  patient_data: any;
}

const CallOptions: React.FC<Props> = ({ patient_data }) => {
  const [open, setOpen] = useState(false);
  const [heading, setHeading] = useState("");
  const [modelFormIndex, setModelFormIndex] = useState(0);

  const handleOpen = (name: string, index: number) => {
    setOpen(true);
    setHeading(name);
    setModelFormIndex(index);
  };
  return (
    <div
      className={
        (patient_data && patient_data.count < 1) ||
        (patient_data.count > 0 &&
          patient_data.results[0].call_status === "CFresh")
          ? "call-options disabled"
          : "call-options"
      }
    >
      <button
        type="button"
        style={{ background: "#D0AA3F" }}
        onClick={() =>
          handleOpen(
            "Please click on confirm button and wait for redirection",
            1
          )
        }
      >
        Ring/Switch Off/Call Cut
        <HourglassFullIcon />
      </button>
      <button
        type="button"
        style={{ background: "#4FB5D3" }}
        onClick={() => handleOpen("No. Does Not Exist", 2)}
      >
        No. Does Not Exist
        <WarningIcon />
      </button>
      <button
        type="button"
        style={{ background: "#368436" }}
        onClick={() => handleOpen("Call Back", 3)}
      >
        Call Back
        <CallIcon />
      </button>
      <button
        type="button"
        style={{ background: "#1ABB9C" }}
        onClick={() =>
          handleOpen(
            "After confirm button click we transfer on appointment page.",
            4
          )
        }
      >
        Agree for Appointment
        <EventAvailableIcon />
      </button>
      <button
        type="button"
        style={{ background: "#D58512" }}
        onClick={() => handleOpen("Treatment Not Required", 5)}
      >
        Treatment Not Required
        <NotInterestedIcon />
      </button>
      <CallModal
        open={open}
        setOpen={setOpen}
        heading={heading}
        index={modelFormIndex}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  patient_data: state.dashboardReducer.patient_data,
});

export default connect(mapStateToProps)(CallOptions);
