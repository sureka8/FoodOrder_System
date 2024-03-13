import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { data } from "autoprefixer";
import { AuthContext } from "../contexts/AuthProvider";

const Model = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { singupwithgmail, login } = useContext(AuthContext);
  const [errormessage, setErrormessage] = useState("");

  {
    /*rediracting to home page  */
  }

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.form?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    //console.log(email,password)
    login(email, password)
      .then((result) => {
        const user = result.user;
        const userInfo={
          name:data.name,
          email:data.email,
        }
        axios.post('http://localhost:6001/users', userInfo)
        .then( (response)=> {
          alert("login successull");
          document.getElementById("my_modal_5").close();
          navigate(from, { replace: true });
        });

       
      })
      .catch((error) => {
        const errormessage = error.message;
        setErrormessage("provide a correct email password");
      });
  };

  //google sign in
  {/* 

  const handleLogin = () => {
    singupwithgmail()
      .then((result) => {
        const user = result.user;
        alert("login successull");
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };
  */}

  const handleLogin = () => {
    singupwithgmail()
      .then((result) => {
        const user = result.user;
        const userInfo={
          name:result?.user.displayName,
          email:result?.user.email,
        }
        axios.post('http://localhost:6001/users', userInfo)
          .then( (response)=> {
            //alert("Acount creation successfull");

            alert("login successull");
            navigate('/');
          });
       
      })
      .catch((error) => console.log(error));
  };



  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action mt-0 flex flex-col justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body"
            method="dialog"
          >
            <h3 className="font-bold text-lg">Please Login</h3>
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

            {errormessage ? (
              <p className="text-red text-xs">{errormessage}</p>
            ) : (
              ""
            )}

            {/*logi button */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                className="btn bg-green text-white"
              />
            </div>
            <p className="text-center my-2">
              Dont have an account?
              <Link to="/signup" className="text-red underline ml-1">
                Signup Now
              </Link>
            </p>

            {/*clouse button */}

            <button
              htmLFor="y_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>

          {/*social signin */}

          <div className="text-center space-x-3 mb-5">
            <button
              className="btn btn-circle hover:bg-green hover:text-white"
              onClick={handleLogin}
            >
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
      </div>
    </dialog>
  );
};

export default Model;
