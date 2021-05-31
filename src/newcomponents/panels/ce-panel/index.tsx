import React from "react";

const CEPanel: React.FC = () => {
  return (
    <div className="agent-calls">
      <div>
        <span>Last Call Time:</span>
        <span style={{ fontWeight: 700 }}>10:30am</span>
      </div>
      <div style={{ marginTop: "10px" }}>Total Call --</div>
      <div>
        <span>Fresh:</span>
        <span style={{ fontWeight: 700 }}>5</span>
      </div>
      <div>
        <span>New:</span>
        <span style={{ fontWeight: 700 }}>3</span>
      </div>
      <div>
        <span>Appointment Schedule:</span>
        <span style={{ fontWeight: 700 }}>4</span>
      </div>
      <div>
        <span>Appointment Done:</span>
        <span style={{ fontWeight: 700 }}>4</span>
      </div>
      <div>
        <span>Appointment Missed:</span>
        <span style={{ fontWeight: 700 }}>4</span>
      </div>
      <div>
        <span>Appointment Done Hot:</span>
        <span style={{ fontWeight: 700 }}>4</span>
      </div>
      <div style={{ marginTop: "10px" }}>
        <span>Talktime:</span>
        <span style={{ fontWeight: 700 }}>02:35:45</span>
      </div>
    </div>
  );
};

export default CEPanel;
