import React from 'react';

export default function Search() {
  const search = e => {
    e.preventDefault();
    console.log("search button is pressed")
  }
  return (
    <>
      <h2>Search</h2>
      <form onSubmit={search}>
        <div>
          <p> Enter what you have in a fridge</p>{" "}
          <input type="text" placeholder="your ingredients here" autoFocus />
        </div>
        <button className="button">Search</button>
      </form>
    </>
  );
}