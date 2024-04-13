import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleLogin}>Go to Login Page</button>
    </div>
  );
};

export default Home;
