import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    setToken("this is a test token");
    navigate("/", { replace: true });
  };

  //   setTimeout(() => {
  //     handleLogin();
  //   }, 3 * 1000);

  return (
    <>
      <h1>Login Page</h1>
      <div>
        <button onClick={handleLogin}>Click to Login</button>
      </div>
    </>
  );
};

export default Login;
