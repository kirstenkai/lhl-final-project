import React from "react"

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
};


    // <div>
    //   <form className="login" method="POST" action="/">
    //     <div class="container">
    //       <div className="email">
    //         <label for="email">
    //           <b>Login</b>
    //         </label>
    //         <input>
    //           type="text"
    //           placeholder="email"
    //           name="login"
    //           required
    //         </input>
    //       </div>
    //       <div className="password">
    //         <label for="password">
    //           <b>Password</b>
    //         </label>
    //         <input
    //           type="password"
    //           placeholder="password"
    //           name="password"
    //           required
    //         />
    //       </div>
    //       <div>
    //         <button type="submit">Login</button>
    //       </div>
    //     </div>
    //   </form>
    // </div >

// expotr default Login;