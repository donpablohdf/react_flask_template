import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {BiLogInCircle} from "react-icons/bi";
import { TfiHelp } from "react-icons/tfi";
import { BsCart } from "react-icons/bs";
import {BsSearch} from "react-icons/bs"

import "../../styles/navbar.css"
import logo from '../../img/OMT1.png';

export const Navbar = () => {

	/* Navbar Animation*/
	const [show, setShow] = useState(false)
	const controlNavbar = () => {
		if(window.scrollY > 80){
			setShow(true)
		} else{
			setShow(false)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll',controlNavbar)
		return () =>{
			window.removeEventListener('scroll',controlNavbar)
		}
	},[])

	return (
		<div className={`header_area ${show && 'stickyheader'}`} id="header">
			<div className="container-fluid">
				<div className="row">
					<div className="col-12">
						<nav className="navbar navbar-expand-lg">
							<div className="col-1"></div>
							<div className = "col-5">
								<Link to="/">
									<span className="home nav-link"><img className="img-fluid logo" src={logo}/></span>
								</Link>
							</div>
								<div className ="changeColor col-1">
									<Link to="/search">
										<span className="search nav-link"><BsSearch size="30px" className="changeColor"/></span>
									</Link>
								</div>
								<div className ="changeColor col-1">
									<Link to="/login">
										<span className="login nav-link"><BiLogInCircle size="35px" className="changeColor"/></span>
									</Link>
								</div>
								<div className ="changeColor col-1">
									<Link to="/help">
										<span className="help nav-link"><TfiHelp size="30px" className="changeColor"/></span>
									</Link>
								</div>
								<div className ="changeColor col-1">
									<Link to="/cart">
										<span className="cart nav-link"><BsCart size="30px" className="changeColor"/></span>
									</Link>
								</div>
								<div className = "col-2"></div>
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
};
