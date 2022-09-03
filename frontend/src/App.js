import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";
import Home from './pages/Home';
import Messages from './pages/Messages';
import SignUp from './pages/SignUp';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="messages" element={<Messages />} />
        <Route path="signup" element={<SignUp/>} />
      </Route>
    </Routes>
  </BrowserRouter>
      
    </>
  );
}

export default App;
