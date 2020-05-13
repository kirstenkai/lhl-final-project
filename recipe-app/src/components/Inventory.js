import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment, { diff } from "moment";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const save = e => {
  e.preventDefault();
  const today = moment().format("YYYYMMDD");
  const name = e.target.elements.name.value;
  let date = moment(e.target.elements.date.value).format("YYYYMMDD");

  console.log("date: ", date);
  console.log("today: ", today);

  console.log(date.diff(today, "days") + "d");
  // console.log(diff);
};

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

export default function Inventory() {
  const classes = useStyles();

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
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
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
