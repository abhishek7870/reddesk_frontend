import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { fbFileUpload } from "../../../../actions/fb-agent/fileUploadActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: "20px",
    },
  })
);

interface Props {
  loading: boolean;
  fbFileUpload: Function;
}

const AdminFBUpload: React.FC<Props> = ({ loading, fbFileUpload }) => {
  const classes = useStyles();
  const [file, setFile] = React.useState<File>();
  const [file_name, setFileName] = React.useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!!event.currentTarget) {
      if (event.currentTarget!.files) {
        setFile(event.currentTarget.files[0]);
        setFileName(event.currentTarget.files[0].name);
      }
    }
  };

  const submitFile = async () => {
    await fbFileUpload(file);
    setFileName("");
  };
  return (
    <div className="main-file-upload">
      <div className="file-upload-wrapper">
        <div className="file-uploader">
          <input
            type="text"
            style={{
              height: "100%",
              padding: "6px 16px",
              marginRight: "5px",
            }}
            value={file_name}
            disabled
          />
          <Button variant="contained" component="label" color="secondary">
            Select File
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          <Button
            variant="contained"
            component="label"
            color="primary"
            style={{
              color: "#fff",
              marginLeft: "5px",
            }}
          >
            <a href={`${process.env.PUBLIC_URL}/Sample.csv`} download>
              Sample File
            </a>
          </Button>
        </div>
        <Button
          variant="contained"
          component="label"
          style={{
            backgroundColor: "#924A91",
            color: "#fff",
            width: "100%",
            marginTop: "20px",
          }}
          onClick={submitFile}
        >
          Upload
        </Button>
        {loading && (
          <div className={classes.root}>
            <LinearProgress />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loading: state.fileUploadReducer.loading,
});

export default connect(mapStateToProps, { fbFileUpload })(AdminFBUpload);
