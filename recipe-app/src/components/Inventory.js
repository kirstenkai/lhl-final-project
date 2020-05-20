import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment, { diff } from "moment";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";
import Alert from "@material-ui/lab/Alert";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  tableContainer: {
    width: "85%"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background:
      "linear-gradient(rgba(255,255,255,.85), rgba(255,255,255,.85)), url(img/inventory.jpg)",
    height: "100vh"
  },
  newcontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginRight: "58%",
    fontSize: "10px",
    background:
      "linear-gradient(rgba(255,255,255,.85), rgba(255,255,255,.85)), url(img/inventory.jpg)",
    padding: "20px",
    name: {
      height: "20px"
    },
    calendar: {
      padding: "12px 20px"
    }
  },
  inventoryForm: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "60%",
    background: "#fffffe",
    margin: "20px 0"
  },
  btn: {
    background: "lightskyblue",
    padding: "7px 34px",
    border: "none",
    borderRadius: "4px",
    boxShadow: "1px 1px 10px lightgrey"
  },

  // table: {
  //   minWidth: 400,
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "space-evenly",
  //   marginLeft: "20em"
  // },
  // container: {
  //   background:
  //     "linear-gradient(rgba(255,255,255,.85), rgba(255,255,255,.85)), url(img/inventory.jpg)"
  // },
  root: {
    width: "16%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

// function createData(name, expiry, daysleft) {
//   return { name, expiry, daysleft };
// }

export default function Inventory() {
  const classes = useStyles();

  // const user_id = "mock";
  const [item, setItem] = useState([]);
  const [currentItem, setCurrentItem] = useState("");

  const { loading, user } = useAuth0();
  const userId = user.email;
  console.log(userId);
  const [currentDate, setCurrentDate] = useState("");

  //-----------------------save to do a REMOVE request--------------------
  const remove = (e, id) => {
    e.preventDefault();

    Axios.delete(`http://localhost:5000/api/inventory/${id}`, {}).then(res => {
      setItem(prev => {
        return prev.filter(item => item.id !== id);
      });
    });
  };

  const handleCurrentItem = e => setCurrentItem(e.target.value);

  const handleCurrentDate = e => setCurrentDate(e.target.value);
  const [selectedDate, setSelectedDate] = useState(Date.now());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const save = e => {
    e.preventDefault();

    const today = moment();
    const item = e.target.elements.name.value;
    setCurrentItem(item);

    const expiry = moment(e.target.elements.date.value);
    setCurrentDate(expiry);
    const expiryDate = moment(expiry).format("MMMM Do YYYY");
    const daysleft = expiry.diff(today, "days");

    Axios.post("http://localhost:5000/api/inventory", {
      userId,
      item,
      expiryDate,
      daysleft
    }).then(res => {
      setCurrentItem("");
      setCurrentDate("");
      setItem(prev => {
        return [...prev, res.data];
      });
    });
  };
  //-----------------------UseEffect to render items--------------------
  //  const { loading, user } = useAuth0();
  // console.log(user.sub);
  useEffect(() => {
    // const userId = user.email;

    Axios.get(`/api/inventory/${userId}`).then(res => {
      console.log("res == ", res);
      setItem(prev => {
        return [...prev, ...res.data];
      });
    });
  }, []);

  // Show the loading state if the page is loading or if there is no user currently authenticated
  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.container}>
      <form onSubmit={save} className={classes.inventoryForm}>
        <TextField
          className="name"
          name="name"
          type="text "
          autoFocus
          onChange={handleCurrentItem}
          value={currentItem}
          required
          id="filled-secondary"
          label="Item"
          // variant="filled"
          color="primary"
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              className="calendar"
              placeholder="Date"
              name="date"
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={handleDateChange}
              // value={currentDate}
              // onChange={handleCurrentDate}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>

        <button className={classes.btn}>ADD</button>
      </form>

      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="col" align="left">
                <strong>Food Item</strong>
              </TableCell>
              <TableCell component="th" scope="col" align="center">
                <strong>Expiry Date</strong>
              </TableCell>
              <TableCell component="th" scope="col" align="center">
                <strong>Days Left</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {item.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="left" component="td" scope="row">
                  <button
                    onClick={e => {
                      // remove from state
                      remove(e, row.id);
                    }}
                  >
                    {" "}
                    x{" "}
                  </button>
                  {row.name}
                </TableCell>
                <TableCell align="center" component="td" scope="row">
                  {row.expiry_date}
                </TableCell>
                <TableCell
                  align="right"
                  className={classes.root}
                  component="td"
                  scope="row"
                >
                  {row.daysleft >= 0 && row.daysleft < 3 && (
                    <Alert variant="filled" severity="warning">
                      Expiring Soon
                    </Alert>
                  )}
                  {row.daysleft >= 3 && (
                    <Alert variant="filled" severity="success">
                      {row.daysleft} days
                    </Alert>
                  )}
                  {row.daysleft < 0 && (
                    <Alert variant="filled" severity="error">
                      Expired
                    </Alert>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
