import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { data } from "autoprefixer";
import Model from "./Model";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, login, updateuserprofile } = useContext(AuthContext);
  {
    /*rederictive home page */
  }
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.form?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((result) => {
        // Signed up
        const user = result.user;
        updateuserprofile(data.email, data.photoURL).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axios
            .post("http://localhost:6001/users", userInfo)
            .then((response) => {
              alert("Acount creation successfull");

              document.getElementById("my_modal_5").close();
              navigate(from, { replace: true });
            });
        });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("allready rgister email")
        // ..
      });
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-action mt-0 flex flex-col justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-lg">Create A Account</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered"
              // required
              {...register("name")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              // required
              {...register("email")}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              // required
              {...register("password")}
            />
            <label className="label mt-1">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          {/* error */}

          {/*logi button */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="signup"
              className="btn bg-green text-white"
            />
          </div>
          <p className="text-center my-2">
            Have a account
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="text-red underline ml-1"
            >
              Login
            </button>
          </p>

          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>

        {/*social signin */}

        <div className="text-center space-x-3 mb-5">
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGoogle />
          </button>

          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebookF />
          </button>

          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
      <Model />
    </div>
  );
};

export default Signup;
