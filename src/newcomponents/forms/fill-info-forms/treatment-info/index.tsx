import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ToggleButton from "@material-ui/lab/ToggleButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { treatmentDetails } from "../../../../actions/patientInfoActions";
import { connect } from "react-redux";

import "./index.sass";

const useStyles = makeStyles({
  root: {
    minWidth: "90%",
    background: "#F7F7F7",
    margin: "10px 0",
  },
});

interface Props {
  treatmentDetails: Function;
  id: number;
  loading_form_1: boolean;
  data: any;
}

const TreatmentInfo: React.FC<Props> = ({
  treatmentDetails,
  id,
  loading_form_1,
  data,
}) => {
  const classes = useStyles();
  let history = useHistory();
  const [treatment, setTreatment] = React.useState<number>(3);
  const [otherTreatment, setOtherTreatment] = React.useState<string>("");
  const [language, setLanguage] = React.useState<string | null>("eng");
  const [otherLanguage, setOtherLanguage] = React.useState<string>("");
  const [contact, setContact] = React.useState<string | null>("male");
  const [toggleForm, setToggleForm] = React.useState<boolean>(true);

  const handleTreatment = (
    event: React.MouseEvent<HTMLElement>,
    newTreatment: number
  ) => {
    setTreatment(newTreatment);
  };
  const handleOtherTreatment = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setOtherTreatment(event.target.value as string);
  };
  const handleOtherLanguage = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setOtherLanguage(event.target.value as string);
  };
  const handleLanguage = (
    event: React.MouseEvent<HTMLElement>,
    newLanguage: string | null
  ) => {
    setLanguage(newLanguage);
  };
  const hanldeContact = (
    event: React.MouseEvent<HTMLElement>,
    newContact: string | null
  ) => {
    setContact(newContact);
  };

  useEffect(() => {
    setContact(data.calling_gender);
  }, [data]);

  const submitForm = async () => {
    let body = {
      treatment,
      other_treatment: otherTreatment,
      language,
      other_language: otherLanguage,
      calling_gender: contact,
      status: otherTreatment.length > 0 ? "NR" : "RL",
    };

    await treatmentDetails(body, id);
    if (treatment === 6) {
      history.push("/dashboard");
    }
    setToggleForm(false);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <div
          className="header-collapse"
          onClick={() => setToggleForm(!toggleForm)}
        >
          Treatment Details{" "}
          {!toggleForm ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </div>
        <form
          className="form-fields info"
          style={{ display: !toggleForm ? "none" : "block" }}
        >
          <div className="form-elements">
            <p>Select Treatment</p>
            <div style={{ display: "flex" }}>
              <ToggleButtonGroup
                value={treatment}
                exclusive
                onChange={handleTreatment}
                aria-label="text alignment"
                style={{ width: "auto" }}
              >
                <ToggleButton value={3}>SURROGACY</ToggleButton>
                <ToggleButton value={2}>IVF</ToggleButton>
                <ToggleButton value={1}>IUI</ToggleButton>
                <ToggleButton value={4}>HISTRO/LAPROSCOPY</ToggleButton>
                <ToggleButton value={5}>OTHER FERTILITY TREATMENT</ToggleButton>
                <ToggleButton value={6}>OTHER</ToggleButton>
              </ToggleButtonGroup>
              {treatment === 6 ? (
                <input
                  type="text"
                  placeholder="Write Treatment"
                  className="other-text"
                  name=""
                  value={otherTreatment}
                  onChange={handleOtherTreatment}
                />
              ) : null}
            </div>
          </div>
          <div className="form-elements">
            <p>Select Language</p>
            <div style={{ display: "flex" }}>
              <ToggleButtonGroup
                value={language}
                exclusive
                onChange={handleLanguage}
                aria-label="text alignment"
                style={{ width: "auto" }}
              >
                <ToggleButton value="hi">Hindi</ToggleButton>
                <ToggleButton value="en">English</ToggleButton>
                <ToggleButton value="ta">Tamil</ToggleButton>
                <ToggleButton value="te">Telugu</ToggleButton>
                <ToggleButton value="bn">Bengali</ToggleButton>
                <ToggleButton value="mr">Marathi</ToggleButton>
                <ToggleButton value="gu">Gujrati</ToggleButton>
                <ToggleButton value="tz">Other</ToggleButton>
              </ToggleButtonGroup>
              {language === "tz" ? (
                <input
                  type="text"
                  placeholder="Write Language"
                  className="other-text"
                  name=""
                  value={otherLanguage}
                  onChange={handleOtherLanguage}
                />
              ) : null}
            </div>
          </div>
          <div className="form-elements">
            <p>Select Contact Person</p>
            <ToggleButtonGroup
              value={contact}
              exclusive
              onChange={hanldeContact}
              aria-label="text alignment"
            >
              <ToggleButton value="men">Male</ToggleButton>
              <ToggleButton value="women">Female</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </form>
      </CardContent>
      <CardActions
        style={{ paddingLeft: "16px", display: !toggleForm ? "none" : "block" }}
      >
        <Button
          style={{
            background: "#924A91",
            color: "#fff",
            paddingTop: "0",
            paddingBottom: "0",
            width: "100%",
          }}
          size="large"
          onClick={submitForm}
          disabled={loading_form_1}
        >
          <p>
            {loading_form_1 ? (
              <CircularProgress style={{ color: "#fff" }} size={24} />
            ) : (
              "Submit"
            )}
          </p>
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state: any) => ({
  loading_form_1: state.patientInfoReducer.loading_form_1,
});
export default connect(mapStateToProps, { treatmentDetails })(TreatmentInfo);
