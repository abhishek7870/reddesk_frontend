import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  leadTransfer,
  leadTransferByComma,
} from "../../../../../actions/admin-agent/leadTransferActions";
import { isEmpty } from "../../../../../helpers/isEmpty";

const useStyles = makeStyles({
  root: {
    minWidth: "50%",
    background: "#F7F7F7",
    margin: "10px 0",
  },
});

interface Props {
  leadTransfer: Function;
  leadTransferByComma: Function;
  user_panel: any;
  loading: boolean;
}

const AdminLeadTransfer: React.FC<Props> = ({
  leadTransfer,
  leadTransferByComma,
  user_panel,
  loading,
}) => {
  const classes = useStyles();

  const [ids, setIDs] = React.useState<string>("");
  const [panel_user, setPanelUser] = React.useState<number | null>(null);
  const [lead_type, setLeadType] = React.useState<string>("id");

  useEffect(() => {
    leadTransfer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLeadChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLeadType(event.target.value as string);
  };

  const handleIDs = (event: React.ChangeEvent<{ value: unknown }>) => {
    setIDs(event.target.value as string);
  };

  const submitForm = async () => {
    let body = {
      lead_ids: ids.split(","),
      value: lead_type,
      panel_user,
    };
    await leadTransferByComma(body);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className="header-collapse">Lead Transfer </div>
        <form className="form-fields info">
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Lead ID</p>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={10}
                style={{ width: "100%" }}
                value={ids}
                onChange={handleIDs}
              />
            </div>
          </div>
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Number is</p>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  style={{ width: "100%" }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={lead_type}
                  onChange={handleLeadChange}
                >
                  <MenuItem value={"number"}>Phone no</MenuItem>
                  <MenuItem value={"id"}>Lead ID</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Username</p>
              <FormControl variant="outlined" required>
                {!isEmpty(user_panel) && user_panel.panel_user.length > 0 ? (
                  <Autocomplete
                    id="combo-box-demo"
                    // value={treatment_city}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        let obj = JSON.parse(
                          JSON.stringify(newValue, null, " ")
                        );

                        setPanelUser(obj.id);
                      }
                    }}
                    options={user_panel.panel_user}
                    freeSolo
                    getOptionLabel={(option: any) => option.user}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    )}
                  />
                ) : (
                  <TextField variant="outlined" />
                )}
              </FormControl>
            </div>
          </div>
        </form>
        <CardActions style={{ padding: "8px 0" }}>
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
          >
            <p>
              {loading ? (
                <CircularProgress style={{ color: "#fff" }} size={24} />
              ) : (
                "Submit"
              )}
            </p>
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state: any) => ({
  user_panel: state.leadTransferReducer.user_panel,
  loading: state.leadTransferReducer.loading,
});
export default connect(mapStateToProps, { leadTransfer, leadTransferByComma })(
  AdminLeadTransfer
);
