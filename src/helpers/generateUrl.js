const isSelected = (field) => {
  if (field === "all" || field === "" || field === undefined) {
    return false;
  } else {
    return true;
  }
};

const isSelectedNum = (field) => {
  if (field === 0 || field === undefined) {
    return false;
  } else {
    return true;
  }
};
export const generateCallsUrl = (body) => {
  const {
    city,
    lead_source,
    treatment,
    panel_user,
    priority,
    language,
    followup_date_start,
    followup_date_end,
    status,
    day,
  } = body;
  const city_part = isSelectedNum(city) ? `&city=${city}` : "";
  const source_part = isSelected(lead_source)
    ? `&lead_source=${lead_source}`
    : "";
  const treatment_part = isSelectedNum(treatment)
    ? `&treatment=${treatment}`
    : "";
  const panel_user_part = isSelectedNum(panel_user)
    ? `&panel_user=${panel_user}`
    : "";
  const priority_part = isSelected(priority) ? `&priority=${priority}` : "";
  const language_part = isSelected(language) ? `&language=${language}` : "";
  const followup_date_start_part = isSelected(followup_date_start)
    ? `&followup_date_start=${followup_date_start}`
    : "";
  const followup_date_end_part = isSelected(followup_date_end)
    ? `&followup_date_end=${followup_date_end}`
    : "";
  const status_part = isSelected(status) ? `&status=${status}` : "";
  const url = `?day=${day}${city_part}${source_part}${treatment_part}${panel_user_part}${priority_part}${language_part}${followup_date_start_part}${followup_date_end_part}${status_part}`;

  return url;
};

export const generateAppointmentsUrl = (body) => {
  const {
    appt_status,
    center,
    doctor,
    treatment,
    panel_user,
    priority,
    appt_date_start,
    appt_date_end,
    day,
  } = body;
  const appt_status_part = isSelectedNum(appt_status)
    ? `&appt_status=${appt_status}`
    : "";
  const center_part = isSelectedNum(center) ? `&center=${center}` : "";
  const doctor_part = isSelectedNum(doctor) ? `&doctor=${doctor}` : "";
  const treatment_part = isSelectedNum(treatment)
    ? `&treatment=${treatment}`
    : "";
  const panel_user_part = isSelectedNum(panel_user)
    ? `&panel_user=${panel_user}`
    : "";
  const priority_part = isSelected(priority) ? `&priority=${priority}` : "";
  const appt_date_start_part = isSelected(appt_date_start)
    ? `&appt_date_start=${appt_date_start}`
    : "";
  const appt_date_end_part = isSelected(appt_date_end)
    ? `&appt_date_end=${appt_date_end}`
    : "";

  const url = `?day=${day}${appt_status_part}${center_part}${doctor_part}${treatment_part}${panel_user_part}${priority_part}${appt_date_start_part}${appt_date_end_part}`;

  return url;
};

export const generatePositiveCallsUrl = (body) => {
  const {
    city,
    lead_source,
    treatment,
    panel_user,

    followup_date_start,
    followup_date_end,

    day,
  } = body;
  const city_part = isSelectedNum(city) ? `&city=${city}` : "";
  const source_part = isSelected(lead_source)
    ? `&lead_source=${lead_source}`
    : "";
  const treatment_part = isSelectedNum(treatment)
    ? `&treatment=${treatment}`
    : "";
  const panel_user_part = isSelectedNum(panel_user)
    ? `&panel_user=${panel_user}`
    : "";

  const followup_date_start_part = isSelected(followup_date_start)
    ? `&followup_date_start=${followup_date_start}`
    : "";
  const followup_date_end_part = isSelected(followup_date_end)
    ? `&followup_date_end=${followup_date_end}`
    : "";

  const url = `?day=${day}${city_part}${source_part}${treatment_part}${panel_user_part}${followup_date_start_part}${followup_date_end_part}`;

  return url;
};
