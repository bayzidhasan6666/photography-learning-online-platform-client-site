import React, { useContext, useEffect, useState } from 'react';
import './Login.css';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from 'react-simple-captcha';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import SocialLogin from '../../../components/SocialLogin/SocialLogin';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: `User logged in successful`,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'User not found!',
          text: `Please check your email & password`,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      });
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="hero background min-h-screen border shadow-xl my-10">
        <div className="hero-content">
          <div className="card flex-shrink-0 w-[500px] max-w-xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <h1 className="text-2xl mb-5 text-white text-center font-bold">
                  Login With Your Account
                </h1>

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="p-2 border-2"
                />
              </div>
              <div className="form-control password-control">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  className="p-2 border-2"
                />
                <span
                  className="password-toggle pt-2 "
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  name="captcha"
                  placeholder="Type here"
                  className="p-2 border-2"
                  onBlur={handleValidateCaptcha}
                />
              </div>
              <div className="form-control mt-6">
                <input
                  disabled={disabled}
                  className={` ${
                    disabled
                      ? 'bg-gradient-to-r from-purple-200 via-pink-200 to-red-200'
                      : 'bg-gradient-to-r from-[#cc40f5]  to-[#5b55fd] cursor-pointer'
                  } rounded font-semibold text-white py-2`}
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <div>
              <p className="font-semibold text-center text-black">
                Don't have an account? Please
                <span>
                  {' '}
                  <Link to={`/signUp`} className="link text-white">
                    Sign Up
                  </Link>
                </span>
              </p>
              <div>
                <h1 className="text-center font-semibold my-2">
                  Or, Login With
                </h1>
                <SocialLogin></SocialLogin>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Login;
