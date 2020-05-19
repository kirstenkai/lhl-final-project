import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment, { diff } from "moment";
import Axios from "axios";
import Alert from "@material-ui/lab/Alert";

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
    width: "10%",
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
      <form onSubmit={save} className={classes.newcontainer}>
        <div>
          Name
          <input
            className="name"
            name="name"
            type="text "
            placeholder="Item"
            autoFocus
            className="text-input"
            onChange={handleCurrentItem}
            value={currentItem}
            required
          />
          Expiry Date
          <input
            className="calendar"
            name="date"
            type="date"
            placeholder="YYYY-MM-DD"
            autoFocus
            onChange={handleCurrentDate}
            value={currentDate}
            className="date-input"
            required
          />
        </div>

        <button>Add a New item!</button>
      </form>

      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="col" align="left">
                Food Item
              </TableCell>
              <TableCell component="th" scope="col" align="center">
                Expiry Date
              </TableCell>
              <TableCell component="th" scope="col" align="right">
                Days Left
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
                  {row.daysleft === 0 && (
                    <Alert variant="filled" severity="warning">
                      Last Day
                    </Alert>
                  )}
                  {row.daysleft > 2 && (
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
