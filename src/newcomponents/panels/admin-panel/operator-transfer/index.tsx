import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import { OperatorTransfer } from "../../../../actions/admin-agent/leadTransferActions";

const useStyles = makeStyles({
  root: {
    minWidth: "50%",
    background: "#F7F7F7",
    margin: "10px 0",
  },
});

interface Props {
  OperatorTransfer: Function;
  loading: boolean;
}

const AdminOperatorTransfer: React.FC<Props> = ({
  OperatorTransfer,
  loading,
}) => {
  const classes = useStyles();
  const [provider, setProvider] = React.useState<string>("MO");

  const handleProviderChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setProvider(event.target.value as string);
  };

  const submitForm = () => {
    OperatorTransfer(provider);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className="header-collapse">Operator Transfer </div>
        <form className="form-fields info">
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Call Provider</p>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  style={{ width: "100%" }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={provider}
                  onChange={handleProviderChange}
                >
                  <MenuItem value={"MO"}>My Operator</MenuItem>
                  <MenuItem value={"SV"}>Servotel</MenuItem>
                  <MenuItem value={"TM"}>Tech Met</MenuItem>
                  <MenuItem value={"EXO"}>Exotel</MenuItem>
                  <MenuItem value={"GSM"}>GSM</MenuItem>
                </Select>
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
                "Transfer"
              )}
            </p>
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state: any) => ({
  loading: state.leadTransferReducer.loading,
});

export default connect(mapStateToProps, { OperatorTransfer })(
  AdminOperatorTransfer
);
