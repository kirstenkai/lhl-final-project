import React, { useEffect, useState } from "react";
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

  const [item, setItem] = useState([]);

  //-----------------------save to do a post request--------------------
  const save = e => {
    e.preventDefault();
    const user_id = "mock";
    const today = moment();
    const item = e.target.elements.name.value;

    const expiry = moment(e.target.elements.date.value);
    const expiryDate = moment(expiry).format("MMMM Do YYYY");
    const daysleft = expiry.diff(today, "days");

    console.log("days left:", daysleft);
    console.log("days left MOMENT:", moment(expiry).format("MMMM Do YYYY"));

    console.log(daysleft, "This is days left");

    console.log("hello");

    Axios.post("http://localhost:5000/api/inventory", {
      user_id,
      item,
      expiryDate,
      daysleft
    }).then(res => {
      setItem(prev => {
        return [...prev, res.data];
      });
      console.log(item, "item");
    });
  };
  //-----------------------UseEffect to render items--------------------
  useEffect(() => {
    Axios.get("http://localhost:5000/api/inventory").then(res => {
      setItem(prev => {
        return [...prev, ...res.data];
      });
    });
  }, []);

  return (
    <div>
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
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.expiry_date}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.daysleft === 0 && (
                    <h3> 1 day left. Note: Expiring soon!</h3>
                  )}
                  {row.daysleft > 3 && <h3> {row.daysleft} days</h3>}
                  {row.daysleft <= 2 && row.daysleft > 0 && (
                    <h3> {row.daysleft} days left. Note: Expiring soon!</h3>
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
            type="text"
            placeholder="Item"
            autoFocus
            className="text-input"
            required
          />
          Expiry Date
          <input
            name="date"
            type="date"
            placeholder="YYYY-MM-DD"
            autoFocus
            className="date-input"
            required
          />
        </div>

        <button>Add a New item!</button>
      </form>
    </div>
  );
}
