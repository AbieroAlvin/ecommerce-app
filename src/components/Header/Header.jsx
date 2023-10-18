import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { FiShoppingBag } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Header = () => {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const profileActionRef = useRef(null);

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const stickyHeaderFunction = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunction();

    return () => window.removeEventListener("scroll", stickyHeaderFunction);
  });

  const handleClick = () => setOpen(!open);

  const navigateToCart = () => {
    navigate("/cart");
  };

  const toggleProfileActions = () =>
    profileActionRef.current.classList.toggle("show__profileActions");

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="header" ref={headerRef}>
      <nav className="nav__wrapper">
        <div className="logo">
          <div className="logo_wrapper">
            <img src={logo} alt="logo" />
            <h1>
              Supa<span>Mart</span>
            </h1>
          </div>
          <div onClick={handleClick} className="md:hidden z-40">
            {open ? (
              <FaTimes size={25} className="text-black cursor-pointer" />
            ) : (
              <FaBars size={25} className="text-black cursor-pointer" />
            )}
          </div>
        </div>
        <div className="navigation">
          <ul className="menu">
            <li className="nav__item active:font-[700]">
              <Link to="/">Home</Link>
            </li>
            <li className="nav__item active:font-[700]">
              <Link to="/shop">Shop</Link>
            </li>
            <li className="nav__item active:font-[700]">
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>

        <div className="nav__icons">
          <span className="fav__icon">
            <AiOutlineHeart size={22} />
            <span className="badge">1</span>
          </span>
          <span className="cart__icon" onClick={navigateToCart}>
            <FiShoppingBag size={22} />
            <span className="badge">{totalQuantity}</span>
          </span>
          <div className="profile">
            <motion.img
              whileTap={{ scale: 1.2 }}
              src={currentUser ? currentUser.photoURL : userIcon}
              alt="userIcon"
              onClick={toggleProfileActions}
            />
            <div
              className="profile__actions"
              ref={profileActionRef}
              onClick={toggleProfileActions}
            >
              {currentUser ? (
                <span onClick={logout}>Logout</span>
              ) : (
                <div className="flex items-center justify-center gap-3 flex-col">
                  <Link to="/signup">Signup</Link>
                  <Link to="/login">Login</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* mobile menu */}
        <div className="mobile__menu">
          <ul
            className={`md:hidden bg-blue-500 absolute w-[80%] h-[500px] top-[82px]  rounded-xl space-y-4 py-8 z-50 p-6 duration-500 ease-in ${
              open ? "left-[12%]" : "left-[-300%]"
            }`}
          >
            <li className="nav__item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav__item">
              <Link to="/shop">Shop</Link>
            </li>
            <li className="nav__item">
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
