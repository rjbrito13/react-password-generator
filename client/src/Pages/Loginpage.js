import React, { useState } from "react";
import "./Loginpage.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Fade } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const eye = <FontAwesomeIcon icon={faEye} />;
const eyeslash = <FontAwesomeIcon icon={faEyeSlash} />;

const Loginpage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Fade in={true} timeout={1000}>
        <div className="login-container">
          <div className="loginform-container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="login-title">Login...</h1>
              <div className="username-container">
                <input
                  {...register("userName", {
                    required: true,
                    maxLength: 20,
                  })}
                  placeholder="Username"
                />
              </div>
              {errors.userName && (
                <span className="error-message">**Username is required</span>
              )}

              <div className="pass-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("passWord", {
                    pattern: /^[A-Za-z]+$/i,
                    required: true,
                  })}
                  placeholder="Password"
                />

                <i onClick={togglePasswordVisibility}>
                  {showPassword ? eye : eyeslash}
                </i>
              </div>

              {errors.passWord && (
                <span className="error-message">**Password is required</span>
              )}

              <div className="submit-wrapper">
                <input type="submit" className="btnSubmit" value={"Login"} />
              </div>
            </form>

            <div className="signup-wrapper">
              Don't have account yet? <Link to="/signup"> Signup now</Link>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default Loginpage;
