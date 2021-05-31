import React from "react";
import { Link } from "react-router-dom";
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

import SecondFilterHeader from "../filter-headers/second-filter-header";
import CommentsModal from "../positive-calls-main/comment";

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
  search_results: any;
  loading: boolean;
}

const SearchResultsMain: React.FC<Props> = ({ search_results, loading }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState<boolean>(false);
  const [leadId, setLeadId] = React.useState<number>(0);

  const handleClick = (id: number) => {
    console.log(id);
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
                <StyledTableCell align="center">Comments</StyledTableCell>
                <StyledTableCell align="center">Edit</StyledTableCell>
                <StyledTableCell align="center">Urgency</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <Loader />
              ) : search_results.count > 0 ? (
                search_results.results.map((row: any) => (
                  <StyledTableRow key={row.id}>
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
          </Table>
        </TableContainer>
      </div>
      <CommentsModal open={open} setOpen={setOpen} leadId={leadId} />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  search_results: state.dashboardReducer.search_results,
  loading: state.dashboardReducer.loading,
});

export default connect(mapStateToProps)(SearchResultsMain);
