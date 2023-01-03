import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


import { BiLogInCircle } from "react-icons/bi";
import {BiLogOutCircle} from "react-icons/bi"
import {BiArea} from "react-icons/bi"

import { TfiHelp } from "react-icons/tfi";
import { BsCart } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

import "../../styles/navbar.css";
import logo from "../../img/OMT1.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const token = localStorage.getItem("jwt-token");
  const userid = localStorage.getItem("userid");
  const [esLogin, setEsLogin] = useState(false);
  //if (userid){setEsLogin(true)}
  /* Navbar Animation*/
  const [show, setShow] = useState(false);
  const controlNavbar = () => {
    if (window.scrollY > 80) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
      
    };
    
  }, []);

  return (
    <div className={`header_area ${show && "stickyheader"}`} id="header">
      <header className="default-header">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-lg">
              <div className="col-1"></div>
              <div className="col-5">
                <Link to="/">
                  <span className="home nav-link">
                    <img className="img-fluid logo" src={logo} />
                  </span>
                </Link>
              </div>
                <div className="changeColor col-1">
                  <Link to="/search">
                    <span className="search nav-link">
                      <BsSearch size="30px" className="changeColor" />
                    </span>
                  </Link>
                </div>
                {(!store.userid ) ? (
                  
                    <div className="changeColor col-1">
                      <Link to="/login" >
                        <span className="login nav-link">
                          <BiLogInCircle size="35px" className="changeColor" onClick={() => setEsLogin(!esLogin)} />
                        </span>
                      </Link>
                    </div>
                  
                ) : (
                  <>
                    <div className="changeColor col-1">
                      <Link to="/logout" >
                        <span className="login nav-link">
                          <BiLogOutCircle size="35px" className="changeColor" onClick={() => setEsLogin(!esLogin)} />
                        </span>
                      </Link>
                    </div>
                    <div className="changeColor col-1">
                      <Link to="/userhome" >
                        <span className="login nav-link">
                          <BiArea size="35px" className="changeColor" onClick={() => setEsLogin(!esLogin)} />
                        </span>
                      </Link>
                    </div>
                 
                  </>
              )}

              <div className="changeColor col-1">
                <Link to="/help">
                  <span className="help nav-link">
                    <TfiHelp size="30px" className="changeColor" />
                  </span>
                </Link>
              </div>
              
              <div className="col-2"></div>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};
