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

function createData(name, expiry, daysleft) {
  return { name, expiry, daysleft };
}

const rows = [
  createData("Milk", "2020-08-20", 6.0),
  createData("Carrot", "2020-06-10", 5.0),
  createData("Soy", "2020-07-04", 9.0)
];

export default function Inventory() {
  const classes = useStyles();

  const [item, setItem] = useState([]);

  //-----------------------save to do a post request--------------------
  const save = e => {
    e.preventDefault();
    const id = 123;
    const today = moment();
    const item = e.target.elements.name.value;
    const expiry = moment(e.target.elements.date.value);
    const daysleft = 5;
    // const today = moment().format("YYYYMMDD");
    console.log(expiry.diff(today, "days") + "days");
    // console.log("date: ", date);
    // console.log("today: ", today);

    // console.log(date.diff(today, "days") + "d");
    // console.log(diff);
    console.log("hello");

    Axios.post("http://localhost:5000/api/inventory", {
      item,
      expiry,
      daysleft
    }).then(res => {
      setItem(prev => {
        return [...prev, res.data];
      });

      console.log("inventory response: ", res);
    });
  };
  //-----------------------UseEffect to render items--------------------
  // useEffect(()=> {
  //   Axios.get("/api/inventory").then((res) => {
  //   console.log("res == ", res)
  //   setItem(prev => {
  //     return [...prev, ...res.data]})

  //   })
  //   },[])

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
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
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
