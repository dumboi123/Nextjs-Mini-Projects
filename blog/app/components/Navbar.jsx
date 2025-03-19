import React from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark bg-opacity-75 fixed-top text-light">
        <div className="container">
          <Link className="navbar-brand text-light font-bold" href="/">
            Blogger
          </Link>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link href="/" className="nav-item nav-link text-light">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/create-blog" className="nav-item nav-link text-light">
                Create Blog
              </Link>
            </li>
          </ul>
          {/* <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
