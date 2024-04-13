import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout", { replace: true });
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <button onClick={handleLogout}>Go to Logout Page</button>
    </div>
  );
};

export default Profile;
