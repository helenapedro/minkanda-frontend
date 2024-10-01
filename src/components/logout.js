import { logoutUser } from "../redux/userSlice";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom'; 
import { useEffect } from 'react'; 

const Logout = ({ logoutUser }) => {
  const navigate = useNavigate(); 

  useEffect(() => {
    try {
      logoutUser();
      navigate("/"); 
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, [logoutUser, navigate]); // Include logoutUser and navigate in the dependency array

  return null;
};

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(null, mapDispatchToProps)(Logout);