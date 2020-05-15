import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {Paper, Typography, Container }from "@material-ui/core";
import moment, { diff } from "moment";
import Axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

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
    <Container maxWidth="lg">
    <div>
      <Typography>
        <h1>Inventory</h1>
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Food Item</TableCell>
              <TableCell align="right">Expiry Date</TableCell>
              <TableCell align="right">Days Left</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {item.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
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
                <TableCell component="th" scope="row">
                  {row.expiry_date}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.daysleft === 0 && (
                    <h3> 1 day left. Note: Expiring soon!</h3>
                  )}
                  {row.daysleft > 2 && <h3> {row.daysleft} days left</h3>}
                  {row.daysleft <= 2 && row.daysleft > 0 && (
                    <h3> {row.daysleft} day left. Note: Expiring soon!</h3>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <form onSubmit={save}>
        <div>
          Name
          <input
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
    </div>
      </Container>
  );
}
