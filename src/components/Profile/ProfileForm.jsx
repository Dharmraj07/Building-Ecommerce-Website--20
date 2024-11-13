import { useContext, useRef } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../redux/auth-context";
import { useNavigate } from "react-router-dom";


const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newEnteredPassword = newPasswordInputRef.current.value;

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBVt-RO94ccrvk80rhHacPWIS4OolR2qJc`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
            password: newEnteredPassword,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = "Password change failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      alert("Password changed successfully!");
      navigate('/'); // Redirect to home page on success
    } catch (error) {
      alert(error.message);
      console.error("Error:", error);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="6"
          ref={newPasswordInputRef}
          required
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
