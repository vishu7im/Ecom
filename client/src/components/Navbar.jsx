import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AuthApi } from "../context/user";
import Cookies from "js-cookie";

const NavBar = () => {
  const Navigate = useNavigate();
  const { user, setuser } = AuthApi();

  return (
    <nav className="bg-blue-900 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            Your Logo
          </Link>
          <ul className="hidden md:flex space-x-6 ml-8">
            <li>
              <Link
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                to="/order"
              >
                Order
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                to="/billing"
              >
                Billing
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                to="/transaction"
              >
                Transaction
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                to="/contact"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 bg-blue-800 rounded-md focus:outline-none"
          />{" "}
          <div className="ml-4">
            {/* Using the AiOutlineShoppingCart icon from react-icons */}
            <Link
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              to="/cart"
            >
              <AiOutlineShoppingCart size={24} />
            </Link>
          </div>
          {user ? (
            <div className="ml-4 flex items-center">
              <img
                src={
                  "https://images.pexels.com/photos/8059110/pexels-photo-8059110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                alt="User Avatar"
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="ml-2">{user.name.slice(0, 6)}</div>
              <button
                className="ml-4 text-white hover:text-blue-200 transition"
                onClick={() => {
                  // Implement logout logic here

                  Cookies.remove("Auth");
                  setuser(null);
                  Navigate("/");
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              to="/login"
              className="ml-4 text-white hover:text-blue-200 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
