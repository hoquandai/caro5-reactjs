import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import qs from "qs";
import axios from "axios";
import Caro from "./components/Caro";

function handleLogin() {
  const userInfo = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };
  axios
    .post("http://localhost:3001/user/login", qs.stringify(userInfo), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    })
    .then(response => {
      const token = `Bearer ${response.data.token}`;
      axios
        .get("http://localhost:3001/me", { headers: { Authorization: token } })
        .then(
          response.status === 200
            ? (window.location.href = "/")
            : (window.location.href = "/user/login")
        )
        .catch
        // window.location.href = '/user/login'
        ();
    })
    .catch();
}
function handleRegister() {
  const userInfo = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    re_password: document.getElementById("re_password").value
  };
  axios
    .post("http://localhost:3001/user/register", qs.stringify(userInfo), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    })
    .then(() => {
      window.location.href = "/user/login";
    })
    .catch(() => {
      window.location.href = "/user/register";
    });
}
export default function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-light">
          <ul className="links">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user/login">
                Login
              </Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/user/login">
            <Login />
          </Route>
          <Route path="/user/register">
            <Register />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <Caro />;
}

function Register() {
  return (
    <Form>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Name" />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We&#39;ll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group controlId="re_password">
        <Form.Label>Re-Password</Form.Label>
        <Form.Control type="password" placeholder="Re-Password" />
      </Form.Group>
      <Button variant="primary" type="button" onClick={handleRegister}>
        Submit
      </Button>
    </Form>
  );
}

function Login() {
  return (
    <Form>
      <Form.Group controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We&#39;ll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="button" onClick={handleLogin}>
        Submit
      </Button>
    </Form>
  );
}
