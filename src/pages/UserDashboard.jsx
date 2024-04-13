import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <div>
      <h1>UserDashboard Page</h1>
      <button onClick={handleLogout}>Go to Logout Page</button>
    </div>
  );
};

export default UserDashboard;
