import React, { FunctionComponent } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import logo from "../../images/logo.jpg";

const useStyles = makeStyles((theme) => ({
  paper: {
    // marTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.2)",
    padding: "0 15px 15px 15px",
    borderRadius: "10px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "transparent",
    borderRadius: 0,
    height: 120,
    width: 120,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  wrapper: {
    // margin: theme.spacing(1),
    position: "relative",
    padding: "0 20px",
  },
  buttonProgress: {
    position: "absolute",
    top: "65%",
    left: "50%",
    marginTop: -9,
    marginLeft: -9,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginTop: "50px",
    backgroundColor: "#924a8d",
  },
}));

type FormData = {
  email: string;
  password: string;
};

type LoginFormProps = {
  handleForm: any;
  loading: boolean;
};

const LoginForm: FunctionComponent<LoginFormProps> = ({
  handleForm,
  loading,
}) => {
  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm<FormData>();

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <img src={logo} alt="Crysta" />
        </Avatar>
        <Typography component="h1" variant="h5">
          LOGIN
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <div
            className="login-fields"
            style={{ marginBottom: "10px", padding: "0 20px" }}
          >
            <p
              style={{ fontWeight: 700, fontSize: "14px", marginBottom: "5px" }}
            >
              Email{" "}
            </p>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={register({
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "invalid email address",
                },
              })}
              required={errors.email ? true : false}
              error={errors.email ? true : false}
              helperText={errors.email && errors.email.message}
            />
          </div>
          <div className="login-fields" style={{ padding: "0 20px" }}>
            <p
              style={{ fontWeight: 700, fontSize: "14px", marginBottom: "5px" }}
            >
              Password
            </p>
            <TextField
              variant="outlined"
              fullWidth
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={register({
                required: "Required",
              })}
              required={errors.password ? true : false}
              error={errors.password ? true : false}
              helperText={errors.password && errors.password.message}
            />
          </div>

          <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.submit}
            >
              Sign In
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;
