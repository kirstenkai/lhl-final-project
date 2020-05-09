import React from "react";

export default function Inventory(props) {
  return (
    <table>
      <thead>
        <tr>
          <th> Item Name</th>
          <th> Expiration Date</th>
        </tr>
      </thead>
      <tbody>
        <td>Milk</td>
        <td>May 15, 2020</td>
      </tbody>
    </table>
  );
}
