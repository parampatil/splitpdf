import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleUpload = () => {
    navigate("/fileupload");
  };

  return (
    <>
    <NavBar />
      <h1>Home Page</h1>
      {/* <button onClick={handleLogin}>Go to Login Page</button> */}
      <button onClick={handleUpload}>Go to File Upload</button>
    </>
  );
};

export default Home;
