import React, { useEffect, useState } from "react";
import "./Signuppage.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Fade } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const eye = <FontAwesomeIcon icon={faEye} />;
const eyeslash = <FontAwesomeIcon icon={faEyeSlash} />;

const Signuppage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  // console.log(watch("passWord")); // watch input value by passing the name of it

  const [showPassword, setShowPassword] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [passwordFocus, setpasswordFocus] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //function for displaying Eye Icon
  const handleEyeVisibility = (event) => {
    if (event.target.value !== "") {
      setShowEye(true);
    } else {
      setShowEye(false);
    }
  };

  //function for handling focus event on password input
  const handlePasswordFocus = (event) => {
    if (event.target.value !== "") {
      setShowEye(true);
      setpasswordFocus(true);
    } else {
      setShowEye(false);
      setpasswordFocus(false);
    }
  };

  //function for handling unfocus event on password input
  const handlePasswordUnFocus = (event) => {
    if (event.target.value !== "") {
      setpasswordFocus(true);
      setShowEye(true);

      if (showPassword) {
        setShowPassword(!showPassword);
      }

      console.log("Pass has value, is password text: " + showPassword);
    } else {
      setpasswordFocus(false);
      setShowEye(false);
    }
  };

  //validation function for username field
  const validateUsername = (value) => {
    if (value.length < 8) return "Username must be at least 8 characters";

    if (!/[A-Z]/.test(value))
      return "Username must contain at least one uppercase letter";
  };

  //validation function for password field
  const validatePassword = (value) => {
    if (value.length < 8) return "Password must be at least 8 characters";

    if (!/[!@#$%^&*()]/.test(value))
      return "Password must contain at least one symbol (!@#$%^&*())";

    if (!/[0-9]/.test(value))
      return "Password must contain at least one number";
  };

  //validation function for Full Name field
  const validateName = (value) => {
    if (value.length < 3) return "Name must be at least 3 characters";
  };

  //useEffect to monitor the value of password field
  useEffect(() => {
    const password = watch("passWord");

    if (password.length !== "") {
      setpasswordFocus(false);
    } else {
      setpasswordFocus(true);
    }

    console.log("Show Eye: " + showEye);
    console.log("Passwordnot null: " + password.length);
  }, [watch, passwordFocus, showEye]);

  return (
    <>
      <Fade in={true} timeout={1000}>
        <div className="signup-container">
          <div className="signupform-container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="signup-title">Create your Account...</h1>

              <div className="name-container">
                <input
                  {...register("name", {
                    required: "Full name is required",
                    validate: validateName,
                  })}
                  placeholder="Full Name"
                />
              </div>
              {errors.name && (
                <span className="error-message">**{errors.name.message}</span>
              )}

              <div className="username-container">
                <input
                  {...register("userName", {
                    required: "Username is required",
                    validate: validateUsername,
                  })}
                  placeholder="Username"
                />
              </div>
              {errors.userName && (
                <span className="error-message">
                  **{errors.userName.message}
                </span>
              )}

              <div className="pass-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("passWord", {
                    // pattern: /^[A-Za-z]+$/i,

                    required: "Password is required",
                    validate: validatePassword,
                    onChange: handleEyeVisibility,
                  })}
                  placeholder="Password"
                  // onChange={handleEyeVisibility}
                  onBlur={handlePasswordUnFocus}
                  onFocus={handlePasswordFocus}
                />

                {showEye && (
                  <i onClick={togglePasswordVisibility}>
                    {showPassword ? eye : eyeslash}
                  </i>
                )}
              </div>

              {errors.passWord && (
                <span className="error-message">
                  **{errors.passWord.message}
                </span>
              )}

              <div className="submit-wrapper">
                <input type="submit" className="btnSubmit" value={"Sign up"} />
              </div>
            </form>

            <div className="signup-wrapper">
              Already have account? <Link to="/loginpage"> Login now..</Link>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default Signuppage;
