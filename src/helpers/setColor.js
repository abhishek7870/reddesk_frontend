export const setColor = (status) => {
  switch (status) {
    case "Appointment Missed" || "appointment_missed":
      return "#ff6969";
    case "Appointment Schedule" || "appointment_schedule":
      return "#d4b000";
    case "Appointment Done" || "appointment_done":
      return "#ffabcf";
    case "Appointment Convert" || "appointment_convert":
      return "#37ff84";
    case "CFresh" || "fresh":
      return "#FF8A4B";
    case "New" || "new":
      return "#ADD8E6";
    case "Reject" || "reject":
      return "#FF3737";
    default:
      return "inherit";
  }
};
