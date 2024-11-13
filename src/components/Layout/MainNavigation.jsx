import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import AuthContext from "../../redux/auth-context";
import { useNavigate } from "react-router-dom";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const navigate=useNavigate();

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler=(e)=>{
    e.preventDefault();
    authCtx.logout();
    navigate('/auth'); // Navigate to the home page after login


  }

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}

         {isLoggedIn &&
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
