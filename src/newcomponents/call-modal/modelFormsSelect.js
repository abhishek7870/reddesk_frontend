import React from "react";
import Callback from "../call-modal-forms/callback/callback";
import NotExists from "../call-modal-forms/no-doesnot-exist";
import RingOption from "../call-modal-forms/ring-option";
import Appointments from "../call-modal-forms/appointments";
import NoAppointment from "../call-modal-forms/no-treatment";
import SendSMS from "../call-modal-forms/send-sms";
import CreateCall from "../call-modal-forms/create-call";
import UpdateCfresh from "../call-modal-forms/update-cfresh";
import AddAltNumber from "../call-modal-forms/alt-no";
import PlayModel from "../panels/admin-panel/tables/playModel";

function ModelFormSelect({ index, setOpen, open }) {
  switch (index) {
    case 1:
      return <RingOption setOpen={setOpen} />;
    case 2:
      return <NotExists setOpen={setOpen} />;
    case 3:
      return <Callback setOpen={setOpen} />;
    case 4:
      return <Appointments setOpen={setOpen} />;
    case 5:
      return <NoAppointment setOpen={setOpen} />;
    case 6:
      return <SendSMS />;
    case 7:
      return <CreateCall setOpen={setOpen} />;
    case 8:
      return <UpdateCfresh setOpen={setOpen} />;
    case 9:
      return <AddAltNumber setOpen={setOpen} />;
    case 10:
      return <PlayModel setOpen={setOpen} />;

    default:
      return null;
  }
}

export default ModelFormSelect;
