import React, { useState } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { auth } from "../../auth/firebase";
import { AuthApi } from "../../context/user";
import Cookies from "js-cookie";
import { AlertApi } from "../../context/alert";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";

const Login = () => {
  const { setuser } = AuthApi();
  const { setAlert } = AlertApi();

  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const handlelogin = async () => {
    const { email, password } = input;
    if ((!email, !password)) {
      setAlert({ type: "warning", message: "All fields are Required" });
      return;
    }
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      // Send the user data to the server
      const playload = {
        uid: user.user.uid,
        email: user.user.email,
      };

      if (user) {
        let url = `${process.env.REACT_APP_API_KEY}/auth/login`;
        const res = await axios.post(url, playload);
        console.log(data);
        const { data } = res;
        Cookies.remove("Auth");
        // if (respose.status === 203) {
        //   navigate("/blocked");
        //   return;
        // }
        setuser(data.user);
        Cookies.set("Auth", JSON.stringify(data.user), { expires: 7 });
        setAlert({ type: "success", message: res.data.message });

        navigate("/");
      }
    } catch (error) {
      setAlert({ type: "warning", message: "Somthing went Wrong " });
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const user = await signInWithPopup(auth, provider);

      // Send the user data to the server

      const playload = {
        uid: user.user.uid,
        email: user.user.email,
      };

      if (user) {
        let url = `${process.env.REACT_APP_API_KEY}/auth/login`;
        const res = await axios.post(url, playload);
        const { data } = res;
        Cookies.remove("Auth");
        // if (respose.status === 203) {
        //   navigate("/blocked");
        //   return;
        // }
        setuser(data.user);
        Cookies.set("Auth", JSON.stringify(data.user), { expires: 7 });
        setAlert({ type: "success", message: res.data.message });

        navigate("/");
      }
    } catch (error) {
      setAlert({ type: "warning", message: "Somthing went Wrong " });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-md px-8 py-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={input.email}
            onChange={handleInput}
            className="px-4 py-2 rounded-md w-full border"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={handleInput}
            className="px-4 py-2 rounded-md w-full border"
          />
        </div>
        <div className="mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center"
            onClick={handlelogin}
          >
            Login
          </button>
        </div>
        <div className="mb-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center"
            onClick={handleLoginWithGoogle}
          >
            <AiFillGoogleCircle className="w-5 h-5 mr-2" />
            Login up with Google
          </button>
        </div>
        <p>
          Have't Account{" "}
          <span
            className="text-green-500 hover:cursor-pointer"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
