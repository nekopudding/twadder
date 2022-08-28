import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";


function App() {
  return (
    <>
      <h1>App</h1>
      <Link to="/signup">Sign Up</Link> |{" "}
      <Link to="/messages">Messages</Link>
      <Outlet/>
    </>
  );
}

export default App;
