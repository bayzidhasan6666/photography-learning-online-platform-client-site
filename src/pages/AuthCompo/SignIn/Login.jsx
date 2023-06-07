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

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
      toast.success('Log In Successful');
      navigate(from, { replace: true });
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
              <div className="form-control">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="p-2 border-2 "
                />
                <label className="label">
                  <a href="#" className="text-sm link  text-white">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  name="captcha"
                  placeholder="type here"
                  className="p-2 border-2 "
                  onBlur={handleValidateCaptcha}
                />
              </div>
              <div className="form-control mt-6">
                <input
                  disabled={disabled}
                  className={` ${
                    disabled
                      ? 'bg-gradient-to-r from-purple-200 via-pink-200 to-red-200'
                      : 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 cursor-pointer'
                  } rounded font-semibold text-white py-2`}
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <div>
              <p className="font-semibold text-center text-black">
                Don't have an account ? Please
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