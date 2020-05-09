import React from "react";

export default function Login(props) {
  const login = (e) => {
    e.preventDefault();
    console.log("login pressed");
  };
  return (
    <div>
      <h2>Login please</h2>
      <form className="login-form" onSubmit={login}>
        <div>
          <p>Login</p>
          <input
            type="text"
            placeholder="Email"
            autoFocus
            className="text-input"
            required
          />
        </div>

        <div>
          <p>Password</p>
          <input
            type="password"
            placeholder="Password"
            autoFocus
            className="text-input"
            required
          />
        </div>
        <button className="button"> Login!</button>
      </form>
    </div>
  );
}
