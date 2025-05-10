import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearAuthState } from "../Features/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login successful!");
      dispatch(clearAuthState());
      setTimeout(() => navigate("/"), 1000); 
    }
    if (error) {
      toast.error(error);
    }
  }, [isAuthenticated, error, dispatch, navigate]);

  return (
    <>
      <ToastContainer />
      <div className="p-4 h-screen flex items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <div className="w-full p-8 rounded-xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20">
            <h1 className="text-3xl font-bold text-center text-white mb-6">
              Login
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="label">
                  <span className="text-base label-text text-white/90">
                    Username
                  </span>
                </label>
                <input
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition duration-300"
                  type="text"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label className="label">
                  <span className="text-base label-text text-white/90">
                    Password
                  </span>
                </label>
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition duration-300"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <p className="text-center text-white/80 mt-4">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-400 hover:text-blue-300 transition duration-300 cursor-pointer"
                >
                  Sign Up
                </Link>
              </p>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 active:bg-white/30 transition duration-300 mt-4 cursor-pointer"
              >
                {loading ? "Logging In..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
