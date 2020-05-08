import React from "react";

const Registration = () => {
  const register = e => {
    e.preventDefault();
    console.log("register");
  };

  return (
    <div>
      <h2>Registration Page</h2>
      <form className="registration-form" onSubmit={register}>
        <div>
          <p>First Name</p>
          <input
            type="text"
            placeholder="First Name"
            autoFocus
            className="text-input"
          />
        </div>
        <div>
          <p>Last Name</p>
          <input
            type="text"
            placeholder="Last Name"
            autoFocus
            className="text-input"
          />
        </div>
        <div>
          <p>E-mail</p>
          <input
            type="text"
            placeholder="E-mail"
            autoFocus
            className="text-input"
          />
        </div>
        <div>
          <p>Password</p>
          <input
            type="password"
            placeholder="Password"
            autoFocus
            className="text-input"
          />
        </div>
        <button className="button"> Sign up!</button>
      </form>
    </div>
  );
};

export { Registration as default };

// <form className="registration" method="POST" action="/">
// <div class="container">
//   <div className="first-name">
//     <b>First Name</b>>
//     <input
//       type="text"
//       placeholder="Enter First Name"
//       name="name"
//       required
//     />
//   </div>

//   <div className="last-name">
//     <b>Last Name</b>

//     <input
//       type="text"
//       placeholder="Enter Last Name"
//       name="name"
//       required
//     />
//   </div>

//   <div className="e-mail">
//     <b>E-mail</b>>
//     <input
//       type="text"
//       placeholder="Enter Last Name"
//       name="name"
//       required
//     />
//   </div>

//   <div className="password">
//     <b>Password</b>>
//     <input
//       type="password"
//       placeholder="Enter Password"
//       name="password"
//       required
//     />
//   </div>

//   <div>
//     <button type="submit">Register</button>
//     <input type="checkbox" checked="checked" name="remember" /> Remember
//     me
//   </div>
// </div>
// </form>
