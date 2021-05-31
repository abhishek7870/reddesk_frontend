import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, Link } from "react-router-dom";
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
import EditIcon from "@material-ui/icons/Edit";
import MessageIcon from "@material-ui/icons/Message";
import {
  getAllPositiveCalls,
  getFilteredPositiveCalls,
} from "../../../../actions/admin-agent/tableActions";
import PositiveCallsTablePaginationActions from "./PositiveCallsTablePaginationActions";
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import CommentsModal from "../../../positive-calls-main/comment";
import Loader from "../../../loader";
import { setColor } from "../../../../helpers/setColor";

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

// custom hook for query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

interface Props {
  getAllPositiveCalls: Function;
  getFilteredPositiveCalls: Function;
  all_positive_calls: any;
  loading: boolean;
}

const AdminPositiveCallsTable: React.FC<Props> = ({
  getAllPositiveCalls,
  getFilteredPositiveCalls,
  all_positive_calls,
  loading,
}) => {
  const classes = useStyles();
  let query = useQuery();
  const [open, setOpen] = React.useState<boolean>(false);
  const [leadId, setLeadId] = React.useState<number>(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(
    10 || all_positive_calls.results.count
  );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    if (newPage > page) {
      let url = all_positive_calls.next;
      getFilteredPositiveCalls(url.substring(url.indexOf("?")));
    } else if (newPage < page) {
      let url = all_positive_calls.previous;
      getFilteredPositiveCalls(
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
    const fetchData = async () => {
      await getAllPositiveCalls(query.get("day"), page + 1);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.get("day")]);

  const handleClick = (id: number) => {
    setOpen(true);
    setLeadId(id);
  };

  return (
    <>
      <div className="data-table">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Call ID</StyledTableCell>
                <StyledTableCell align="center">Husband</StyledTableCell>
                <StyledTableCell align="center">Wife</StyledTableCell>
                <StyledTableCell align="center">
                  Patient Support
                </StyledTableCell>
                <StyledTableCell align="center">City</StyledTableCell>
                <StyledTableCell align="center">Treatment</StyledTableCell>

                <StyledTableCell align="center">
                  Next Call Date/Time
                </StyledTableCell>
                <StyledTableCell align="center">Created At</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Source</StyledTableCell>
                <StyledTableCell align="center">Comments</StyledTableCell>
                <StyledTableCell align="center">Edit</StyledTableCell>
                <StyledTableCell align="center">Urgency</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <Loader />
              ) : all_positive_calls.count > 0 ? (
                all_positive_calls.results.map((row: any) => (
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
                      {row.husband_name ? row.husband_name : "NA"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.wife_name ? row.wife_name : "NA"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.panel_user ? row.panel_user : "NA"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.treatment_city ? row.treatment_city : "NA"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.treatment ? row.treatment : "NA"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.followup_date} {row.followup_time.substring(0, 5)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.created_at.substring(0, 10)}{" "}
                      {row.created_at.substring(11, 16)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.call_status ? row.call_status : "NA"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.lead_source ? row.lead_source : "NA"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <MessageIcon onClick={() => handleClick(row.id)} />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Link
                        to={`/dashboard/ce/patient/edit-call-details?id=${row.id}`}
                      >
                        <EditIcon />
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.priority ? row.priority : "NA"}
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
                count={all_positive_calls.count}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                page={page}
                SelectProps={{
                  native: true,
                }}
                onChangePage={handleChangePage}
                ActionsComponent={PositiveCallsTablePaginationActions}
              />
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
      <CommentsModal open={open} setOpen={setOpen} leadId={leadId} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  all_positive_calls: state.AdminTableReducer.all_positive_calls,
  loading: state.AdminTableReducer.loading,
});

export default connect(mapStateToProps, {
  getAllPositiveCalls,
  getFilteredPositiveCalls,
})(AdminPositiveCallsTable);
