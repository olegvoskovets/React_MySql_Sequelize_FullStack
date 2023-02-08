import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import "./login.css";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:8080/auth/login", data).then((res) => {
      if (res.data.error) {
        console.log(res.data.error);
      } else {
        localStorage.setItem("accessToken", res.data.token);
        setAuthState({
          username: res.data.username,
          id: res.data.id,
          status: true,
        });
        navigate("/");
      }
    });
  };
  return (
    <div className="login">
      <h3 className="login_text">Login</h3>
      <div className="info">
        <div className="item">
          <span>Ім'я:</span>{" "}
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className="item">
          <span>Пароль:</span>{" "}
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <div className="btn">
        <button onClick={login}>Ввійти</button>
      </div>
    </div>
  );
};

export default Login;
