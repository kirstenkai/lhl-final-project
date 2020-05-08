import React from "react";

const Registration = () => {
  return (
    <div>
      <form className="registration" method="POST" action="/">
        <div class="container">
          <div>
            <label for="first-name">
              <b>First Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              name="name"
              required
            />
          </div>

          <div>
            <label for="last-name">
              <b>Last Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter Last Name"
              name="name"
              required
            />
          </div>

          <div>
            <label for="e-mail">
              <b>E-mail</b>
            </label>
            <input
              type="text"
              placeholder="Enter Last Name"
              name="name"
              required
            />
          </div>

          <div>
            <label for="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
            />
          </div>

          <div>
            <button type="submit">Register</button>
            <label>
              <input type="checkbox" checked="checked" name="remember" />{" "}
              Remember me
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export { Registration as default };
