import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Loader from "../loader";
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
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import { connect } from "react-redux";
import {
  getPositiveCalls,
  getPaginatedFilteredPositiveCalls,
} from "../../actions/positiveCallsActions";
import { getCallsFilterData } from "../../actions/dropdownActions";
import SecondFilterHeader from "../filter-headers/second-filter-header";
import CommentsModal from "./comment";
import { setColor } from "../../helpers/setColor";
import PositiveCallsTablePaginationActions from "./PositiveCallsTablePaginationActions";
import "./index.sass";

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
  getPositiveCalls: Function;
  getCallsFilterData: Function;
  getPaginatedFilteredPositiveCalls: Function;
  todays_positive_calls: any;
  loading: boolean;
}

const PositiveCallsMain: React.FC<Props> = ({
  getPositiveCalls,
  getPaginatedFilteredPositiveCalls,
  getCallsFilterData,
  todays_positive_calls,
  loading,
}) => {
  const classes = useStyles();
  let query = useQuery();

  const [open, setOpen] = React.useState<boolean>(false);
  const [leadId, setLeadId] = React.useState<number>(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    const fetchData = async () => {
      await getPositiveCalls(query.get("day"));
      await getCallsFilterData();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.get("day")]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    if (newPage > page) {
      let url = todays_positive_calls.next;
      getPaginatedFilteredPositiveCalls(url.substring(url.indexOf("?")));
    } else if (newPage < page) {
      let url = todays_positive_calls.previous;
      getPaginatedFilteredPositiveCalls(
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

  const handleClick = (id: number) => {
    setOpen(true);
    setLeadId(id);
  };
  return (
    <div className="main-right">
      <div className="call-options"></div>
      <SecondFilterHeader />
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
              ) : todays_positive_calls.count > 0 ? (
                todays_positive_calls.results.map((row: any) => (
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
                      {row.patient_city ? row.patient_city : "NA"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.treatment ? row.treatment : "NA"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.followup_date} {row.followup_time.substring(0, 5)}
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
                      {row.priority}
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
                count={todays_positive_calls.count}
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
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  todays_positive_calls: state.positiveCallsReducer.todays_positive_calls,
  loading: state.positiveCallsReducer.tabel_loading,
});

export default connect(mapStateToProps, {
  getPositiveCalls,
  getCallsFilterData,
  getPaginatedFilteredPositiveCalls,
})(PositiveCallsMain);
