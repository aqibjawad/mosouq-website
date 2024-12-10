import React, { useState } from "react";
import "./header.desktop.css";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [businessMode, setBusinessMode] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header shadow-sm  py-3">
      <Container
        fluid
        className=" px-3 px-md-5  justify-content-between align-items-center d-flex"
      >
        {/* logo */}
        <Link style={{ textDecoration: "none" }} to={"/"} className="logo">
          <div className="mosouq-logo"> Mosouq </div>
        </Link>

        {/* menu bar */}

        <nav className={`nav-links px-3 ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/categories" onClick={toggleMenu}>
            Categories
          </Link>
          <Link to="/deals" onClick={toggleMenu}>
            Deals
          </Link>
          <Link to="/about" onClick={toggleMenu}>
            About
          </Link>
          {/* <Link to="/blogs" onClick={toggleMenu}>
       Blogs
    </Link> */}
          <Link to="/login" onClick={toggleMenu}>
            Login
          </Link>
          <button className="business-button-header">
            <Link to="https://business.mosouq.ae/" style={{ color: "white" }}>
              For Business
            </Link>
          </button>
        </nav>

        {/* toggle button */}

        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? (
            <AiOutlineClose size={30} />
          ) : (
            <AiOutlineMenu size={30} />
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
