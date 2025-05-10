import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <div className="w-full p-8 rounded-xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20">
            <h1 className="text-3xl font-bold text-center text-white mb-6">
              Login
            </h1>
            <form className="space-y-4">
              <div>
                <label className="label">
                  <span className="text-base label-text text-white/90">
                    Username
                  </span>
                </label>
                <input
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
                className="w-full py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 active:bg-white/30 transition duration-300 mt-4 cursor-pointer"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
