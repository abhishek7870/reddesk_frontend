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
import { connect } from "react-redux";
import {
  getAppointments,
  getPaginatedFilteredAppointments,
} from "../../actions/appointmentActions";
import { getAppointmentFilterData } from "../../actions/dropdownActions";
import AppointmentsTablePaginationActions from "./AppointmentsTablePaginationActions";
import FilterHeader from "../filter-headers/filter-header";
import CommentsModal from "../positive-calls-main/comment";
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import { setColor } from "../../helpers/setColor";
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

interface Props {
  getAppointments: Function;
  getAppointmentFilterData: Function;
  getPaginatedFilteredAppointments: Function;
  todays_appnt: any;
  loading: boolean;
}

// custom hook for query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AppointmentsMain: React.FC<Props> = ({
  getAppointments,
  getAppointmentFilterData,
  getPaginatedFilteredAppointments,
  todays_appnt,
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
      await getAppointments(query.get("day"));
      await getAppointmentFilterData();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.get("day")]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    if (newPage > page) {
      let url = todays_appnt.next;
      getPaginatedFilteredAppointments(url.substring(url.indexOf("?")));
    } else if (newPage < page) {
      let url = todays_appnt.previous;
      getPaginatedFilteredAppointments(
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
      <FilterHeader />
      <div className="data-table">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Call ID</StyledTableCell>
                <StyledTableCell align="center">
                  Patient Support
                </StyledTableCell>
                <StyledTableCell align="center">Husband Name</StyledTableCell>
                <StyledTableCell align="center">Wife Name</StyledTableCell>
                <StyledTableCell align="center">
                  Appointment Status
                </StyledTableCell>
                <StyledTableCell align="center">
                  Appointment Date/Time
                </StyledTableCell>
                <StyledTableCell align="center">Clinic</StyledTableCell>
                <StyledTableCell align="center">Doctor</StyledTableCell>

                <StyledTableCell align="center">Treatment</StyledTableCell>
                <StyledTableCell align="center">PCC</StyledTableCell>
                <StyledTableCell align="center">Comments</StyledTableCell>

                <StyledTableCell align="center">Edit</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <Loader />
              ) : todays_appnt.count > 0 ? (
                todays_appnt.results.map((row: any) => (
                  <StyledTableRow
                    key={row.id}
                    style={{
                      background: setColor(row.appt_status),
                    }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.lead_id}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.panel_user}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.husband_name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.wife_name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.appt_status}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.appt_date} / {row.appt_time.substring(0, 5)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.clinic}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.doctor}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row.treatment}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.pcc}</StyledTableCell>
                    <StyledTableCell align="center">
                      <MessageIcon onClick={() => handleClick(row.lead_id)} />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Link
                        to={`/dashboard/ce/patient/edit-appointment-details?id=${row.id}`}
                      >
                        <EditIcon />
                      </Link>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                "NA"
              )}
            </TableBody>
            <TableFooter>
              <TablePagination
                colSpan={6}
                rowsPerPageOptions={[]}
                count={todays_appnt.count}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                page={page}
                SelectProps={{
                  native: true,
                }}
                onChangePage={handleChangePage}
                ActionsComponent={AppointmentsTablePaginationActions}
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
  todays_appnt: state.appointmentsReducer.todays_appnt,
  loading: state.appointmentsReducer.loading,
});

export default connect(mapStateToProps, {
  getAppointments,
  getAppointmentFilterData,
  getPaginatedFilteredAppointments,
})(AppointmentsMain);
