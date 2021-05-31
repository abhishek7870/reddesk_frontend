import React, { useEffect } from "react";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getAllRecordings } from "../../../../actions/admin-agent/tableActions";
import { connect } from "react-redux";
import Loader from "../../../loader";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { setColor } from "../../../../helpers/setColor";
import PlayModel from "./playModel";
import RecordingTablePaginationActions from "./recordingPaginationActions";
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#924A91",
      color: theme.palette.common.white,
      fontSize: "14px",
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

interface Props {
  getAllRecordings: Function;
  all_recordings: any;
  loading: boolean;
}

const AdminRecordingTable: React.FC<Props> = ({
  getAllRecordings,
  loading,
  all_recordings,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const [leadId, setLeadId] = React.useState<number>(0);
  const [url, setUrl] = React.useState<string>("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(
    10 || all_recordings.results.count
  );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    if (newPage > page) {
      let url = all_recordings.next;
      getAllRecordings(url.substring(url.indexOf("?")));
    } else if (newPage < page) {
      let url = all_recordings.previous;

      getAllRecordings(
        url.indexOf("?") === -1 ? "" : url.substring(url.indexOf("?"))
      );
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  useEffect(() => {
    getAllRecordings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (id: number, url: string) => {
    setOpen(true);
    setLeadId(id);
    setUrl(url);
  };

  return (
    <>
      <div className="data-table">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Call ID</StyledTableCell>
                <StyledTableCell align="center">
                  Patient Support
                </StyledTableCell>
                <StyledTableCell align="center">Provider</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Play</StyledTableCell>
                <StyledTableCell align="center">Call Picked</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <Loader />
              ) : all_recordings.count > 0 ? (
                all_recordings.results.map((row: any) => (
                  <StyledTableRow
                    key={row.id}
                    style={{
                      background: setColor(row.call_status),
                    }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.id ? row.id : "NA"}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row.panel_user ? row.panel_user : "NA"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.provider ? row.provider : "NA"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.status ? row.status : "NA"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <PlayCircleFilledIcon
                        onClick={() => handleClick(row.id, row.uploaded_url)}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.call_picked
                        ? row.call_picked
                          ? "Yes"
                          : "No"
                        : "NA"}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                "NA"
              )}
            </TableBody>
            <TableFooter>
              <TablePagination
                colSpan={5}
                rowsPerPageOptions={[]}
                count={all_recordings.count}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                page={page}
                SelectProps={{
                  native: true,
                }}
                onChangePage={handleChangePage}
                ActionsComponent={RecordingTablePaginationActions}
              />
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
      <PlayModel open={open} setOpen={setOpen} leadId={leadId} url={url} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  all_recordings: state.AdminTableReducer.all_recordings,
  loading: state.AdminTableReducer.loading,
});

export default connect(mapStateToProps, { getAllRecordings })(
  AdminRecordingTable
);
