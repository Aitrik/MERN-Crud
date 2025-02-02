"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { create } from "../Redux/userSlice";

export default function Page() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    // Real-time validation
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      
      if (name === "fname" && !value) {
        newErrors.fname = "First name is required";
      } else {
        newErrors.fname = "";
      }

      if (name === "lname" && !value) {
        newErrors.lname = "Last name is required";
      } else {
        newErrors.lname = "";
      }

      if (name === "email") {
        if (!value) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Email is invalid";
        } else {
          newErrors.email = "";
        }
      }

      if (name === "password") {
        if (!value) {
          newErrors.password = "Password is required";
        } else if (value.length < 6) {
          newErrors.password = "Password must be at least 6 characters";
        } else {
          newErrors.password = "";
        }
      }

      return newErrors;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic on submit
    const newErrors = {};
    if (!data.fname) newErrors.fname = "First name is required";
    if (!data.lname) newErrors.lname = "Last name is required";
    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    // If no errors, dispatch the action
    if (Object.keys(newErrors).length === 0) {
      const payload = {
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        password: data.password,
      };
      dispatch(create(payload));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mt-5">
          <div className="w-full bg-white rounded-lg shadow-xl border border-gray-300 md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create a user
              </p>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  First Name
                </label>
                <input
                  name="fname"
                  placeholder="JohnDoe"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  type="text"
                  value={data.fname}
                  onChange={handleChange}
                />
                {errors.fname && <p className="text-red-500 text-sm">{errors.fname}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Last Name
                </label>
                <input
                  name="lname"
                  placeholder="Doe"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  type="text"
                  value={data.lname}
                  onChange={handleChange}
                />
                {errors.lname && <p className="text-red-500 text-sm">{errors.lname}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  name="email"
                  placeholder="john@example.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  name="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  type="password"
                  value={data.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <button
                className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800 text-white"
                type="submit"
              >
                Create an account
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
