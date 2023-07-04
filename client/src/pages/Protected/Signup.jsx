import React, { useState } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { auth } from "../../auth/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";
import { AlertApi } from "../../context/alert";

const Signup = () => {
  const { setAlert } = AlertApi();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const handleSignup = async () => {
    const { name, email, password } = input;
    if ((!email, !password, !name)) {
      setAlert({ type: "warning", message: "All fields are Required" });
      return;
    }
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      // Send the user data to the server

      const playload = {
        uid: user.user.uid,
        name: name,
        email: email,
        status: 1,
      };

      // console.log(user.user);
      // console.log(user._tokenResponse);
      if (user) {
        let url = `${process.env.REACT_APP_API_KEY}/auth/signup`;
        console.log(url);
        const res = await axios.post(url, playload);
        if (res.status === 202) {
          setAlert({ type: "warning", message: res.data.message });

          return;
        }
        setAlert({ type: "warning", message: res.data.message });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      console.log("Failed to sign up with Google.");
    }
  };

  const handleSignupWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(auth, provider);

      // Send the user data to the server

      const playload = {
        uid: user.user.uid,
        name: user._tokenResponse.displayName,
        email: user.user.email,
        status: 1,
      };

      // console.log(user.user);
      // console.log(user._tokenResponse);
      if (user) {
        let url = `${process.env.REACT_APP_API_KEY}/auth/signup`;

        const res = await axios.post(url, playload);

        if (res.status === 202) {
          setAlert({ type: "warning", message: res.data.message });
          return;
        }
        setAlert({ type: "warning", message: res.data.message });
        navigate("/login");
      }
    } catch (error) {
      console.log("Failed to sign up with Google.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-md px-8 py-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={input.name}
            onChange={handleInput}
            className="px-4 py-2 rounded-md w-full border"
          />
        </div>
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
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center"
            onClick={handleSignup}
          >
            Signup
          </button>
        </div>
        <div className="mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center"
            onClick={handleSignupWithGoogle}
          >
            <AiFillGoogleCircle className="w-5 h-5 mr-2" />
            Sign up with Google
          </button>
        </div>
        <p>
          Have an Account{" "}
          <span
            className="text-green-500 hover:cursor-pointer"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
