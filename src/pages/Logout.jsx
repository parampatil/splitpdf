import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken();
    navigate("/", { replace: true });
  };

  //   setTimeout(() => {
  //     handleLogout();
  //   }, 3 * 1000);

  return (
    <>
      <h1>Logout Page</h1>
      <button onClick={handleLogout}>Click to Logout</button>
    </>
  );
};

export default Logout;
