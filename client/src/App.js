import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreatePost from "./pages/createPost/CreatePost";
import { AuthContext } from "./helpers/AuthContext";

import Post from "./pages/Post/Post";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./pages/Profile/Profile";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: "",
    status: false,
  });
  const [username, setUserName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/token", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          setAuthState({ username: "", id: "", status: false });
          setUserName("");
        } else {
          setAuthState({
            username: res.data.username,
            id: res.data.id,
            status: true,
          });
          setUserName(res.data.username);
        }
      });
  }, []);

  const logOut = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: "", status: false });
    setUserName("");
  };
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="left">
              <Link to={"/"}>Головна сторінка</Link>
              <Link to={"/createpost"}>Створити новий пост</Link>
            </div>

            <div className="rigth">
              {!authState.status ? (
                <>
                  <Link to={"/login"}>Ввійти</Link>
                  <Link to={"/registration"}>Зарееструватись</Link>
                </>
              ) : (
                <button onClick={logOut}>Вийти</button>
              )}
              {authState.username && (
                <div className="username">User: {authState.username}</div>
              )}
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
