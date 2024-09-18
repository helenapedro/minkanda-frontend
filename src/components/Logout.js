const Logout = () => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
   
     const handleLogout = () => {
       // Confirm the logout action
       if (window.confirm("Are you sure you want to log out?")) {
         try {
           // Dispatch the Redux action for logout
           dispatch(logoutUser());
   
           // Optionally clear local storage or cookies if used for storing auth tokens
           localStorage.removeItem('authToken'); // Example, adjust as needed
   
           // Redirect to login page or home page
           navigate('/login'); // Adjust the route as needed
         } catch (error) {
           console.error('Logout failed:', error);
           alert('An error occurred while logging out. Please try again.');
         }
       }
     };
   
     return (
       <button onClick={handleLogout} className="btn btn-danger">
         Logout
       </button>
     );
   };
   
   export default Logout;
   