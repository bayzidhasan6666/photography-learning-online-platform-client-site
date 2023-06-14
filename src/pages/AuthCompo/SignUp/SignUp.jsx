import React, { useContext, useState } from 'react';
import '../SignIn/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';

import { AuthContext } from '../../../Provider/AuthProvider';
import SocialLogin from '../../../components/SocialLogin/SocialLogin';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    if (data.password !== data.confirmPassword) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Passwords do not match',
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          container: 'max-w-sm mx-auto mt-10 bg-white rounded-lg shadow-lg p-4',
          title: 'text-xl text-[#cc40f5] font-semibold',
        },
      });
      return;
    }

    createUser(data.email, data.password)
      .then((result) => {
        const createdUser = result.user;
        console.log(createdUser);

        updateUserProfile(data.name, data.photoUrl).then(() => {
          const saveUser = {
            name: data.name,
            email: data.email,
            photoUrl: data.photoUrl,
          };
          fetch('https://photography-school-server-site.vercel.app/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'User Sign Up Successfully',
                  showConfirmButton: false,
                  timer: 2000,
                  customClass: {
                    container:
                      'max-w-sm mx-auto mt-10 bg-white rounded-lg shadow-lg p-4',
                    title: 'text-xl text-green-500 font-semibold',
                  },
                });
              }
            });
          reset();
          navigate('/');
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Email is already in use',
            showConfirmButton: false,
            timer: 2000,
            customClass: {
              container:
                'max-w-sm mx-auto mt-10 bg-white rounded-lg shadow-lg p-4',
              title: 'text-xl text-[#cc40f5] font-semibold',
            },
          });
        }
        reset();
      });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="hero background min-h-screen border shadow-xl my-10">
        <div className="hero-content flex-col ">
          <div className="card w-[500px]">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <h1 className="text-2xl  text-white mb-5 text-center font-bold">
                  Sign Up Please
                </h1>

                <input
                  type="name"
                  name="name"
                  placeholder="Name"
                  className="p-2 border-2"
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <span className="text-[#c022f0] shadow-xl italic">
                    Name is required!
                  </span>
                )}
              </div>
              <div className="form-control">
                <input
                  type="text"
                  name="photoUrl"
                  placeholder="Photo Url"
                  className="p-2 border-2"
                  {...register('photoUrl', { required: true })}
                />
                {errors.photoUrl && (
                  <span className="text-[#c022f0] shadow-xl italic">
                    Photo Url is required!
                  </span>
                )}
              </div>
              <div className="form-control">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="p-2 border-2"
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <span className="text-[#c022f0] shadow-xl italic">
                    Email is required!
                  </span>
                )}
              </div>

              {/* ---------------------Password Validation Start------------- */}
              <div className="form-control">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    className="p-2 border-2 pr-10"
                    {...register('password', {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern:
                        /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]/,
                    })}
                  />
                  <span
                    className="absolute text-white right-3 top-2 cursor-pointer"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                {errors.password && errors.password.type === 'required' && (
                  <span className="text-[#c022f0] shadow-xl italic">
                    Password is required.
                  </span>
                )}
                {watch('password') && (
                  <div className="bg-white mt-5 p-5">
                    {watch('password').length < 6 && (
                      <span className="text-red-400 ">
                        <ul>
                          <li>
                            • Password must be at least 6 characters long.
                          </li>
                        </ul>
                      </span>
                    )}
                    {watch('password').length >= 6 &&
                      watch('password').length <= 20 && (
                        <span className="text-green-400 ">
                          <ul>
                            <li>
                              • Password length should be between 6 and 20
                              characters.
                            </li>
                          </ul>
                        </span>
                      )}
                    {watch('password').length >= 20 && (
                      <span className="text-red-400 ">
                        <ul>
                          <li>
                            • Password must be less than 20 characters long.
                          </li>
                        </ul>
                      </span>
                    )}
                    {!/(?=.*[a-z])/.test(watch('password')) && (
                      <span className="text-red-400 ">
                        <ul>
                          <li>
                            • Password must contain at least one lowercase
                            letter.
                          </li>
                        </ul>
                      </span>
                    )}
                    {/(?=.*[a-z])/.test(watch('password')) && (
                      <span className="text-green-400 ">
                        <ul>
                          <li>• Password contains a lowercase letter.</li>
                        </ul>
                      </span>
                    )}
                    {!/(?=.*[A-Z])/.test(watch('password')) && (
                      <span className="text-red-400 ">
                        <ul>
                          <li>
                            • Password must contain at least one uppercase
                            letter.
                          </li>
                        </ul>
                      </span>
                    )}
                    {/(?=.*[A-Z])/.test(watch('password')) && (
                      <span className="text-green-400 ">
                        <ul>
                          <li>• Password contains an uppercase letter.</li>
                        </ul>
                      </span>
                    )}
                    {!/(?=.*\d)/.test(watch('password')) && (
                      <span className="text-red-400 ">
                        <ul>
                          <li>• Password must contain at least one digit.</li>
                        </ul>
                      </span>
                    )}
                    {/(?=.*\d)/.test(watch('password')) && (
                      <span className="text-green-400 ">
                        <ul>
                          <li>• Password contains a digit.</li>
                        </ul>
                      </span>
                    )}
                    {!/(?=.*[!#$%&@? ])/.test(watch('password')) && (
                      <span className="text-red-400 ">
                        <ul>
                          <li>
                            • Password must contain at least one special
                            character (e.g., !, #, $, %, @, &, ?, or space).
                          </li>
                        </ul>
                      </span>
                    )}
                    {/(?=.*[!#$%&@? ])/.test(watch('password')) && (
                      <span className="text-green-400 ">
                        <ul>
                          <li>• Password contains a special character.</li>
                        </ul>
                      </span>
                    )}
                  </div>
                )}
              </div>
              {/* --------------------password validation end---------------- */}
              <div className="form-control">
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="p-2 border-2 pr-10"
                    {...register('confirmPassword', {
                      required: true,
                      validate: (value) =>
                        value === watch('password') || 'Passwords do not match',
                    })}
                  />
                  <span
                    className="absolute text-white right-3 top-2 cursor-pointer"
                    onClick={handleToggleConfirmPassword}
                  >
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <span className="text-[#c022f0] shadow-xl italic">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
              <div className="form-control mt-6">
                <input
                  className={` bg-gradient-to-r from-[#cc40f5]  to-[#5b55fd] cursor-pointer
                 rounded font-semibold text-white py-2`}
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
            <div>
              <p className="font-semibold text-black text-center">
                Already have an account?{' '}
                <Link to="/LogIn">
                  <span className="font-semibold underline text-white">
                    Sign In
                  </span>
                </Link>
              </p>
            </div>
          </div>
          <div className="card w-[500px]">
            <SocialLogin />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
