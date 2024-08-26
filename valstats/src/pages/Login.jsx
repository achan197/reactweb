import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="loginpage">
      <h1>Login</h1>
      <form>
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        ></input>
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>
          No account? Register <Link to="/register">Here</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
