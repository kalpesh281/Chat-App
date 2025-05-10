import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [gender, setGender] = useState("");

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <div className="w-full p-8 rounded-xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20">
            <h1 className="text-3xl font-bold text-center text-white mb-6">
              Sign Up
            </h1>
            <form className="space-y-4">
              <div>
                <label className="label">
                  <span className="text-base label-text text-white/90">
                    Full Name
                  </span>
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition duration-300"
                  type="text"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="label">
                  <span className="text-base label-text text-white/90">
                    Username
                  </span>
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition duration-300"
                  type="text"
                  placeholder="Choose a username"
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
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="label">
                  <span className="text-base label-text text-white/90">
                    Confirm Password
                  </span>
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition duration-300"
                  type="password"
                  placeholder="Confirm password"
                />
              </div>
              <div className="flex items-center justify-center space-x-8 my-6">
                <label className="flex items-center cursor-pointer space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={handleGenderChange}
                    className="radio radio-sm bg-white/20 border-white/50 checked:bg-white/40 checked:border-white cursor-pointer"
                  />
                  <span className="text-white select-none">Male</span>
                </label>
                <label className="flex items-center cursor-pointer space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={handleGenderChange}
                    className="radio radio-sm bg-white/20 border-white/50 checked:bg-white/40 checked:border-white cursor-pointer"
                  />
                  <span className="text-white select-none">Female</span>
                </label>
              </div>
              <p className="text-center text-white/80">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 transition duration-300 cursor-pointer"
                >
                  Login
                </Link>
              </p>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 active:bg-white/30 transition duration-300 mt-4 cursor-pointer"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
