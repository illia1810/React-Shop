import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import BagInfo from "./BagInfo";
import AppContext from "../../context";
import "./Header.css";

const Header = ({authorizationMenuOpen, openCart}) => {
    const {user} = useContext(AppContext);

    return (
        <div className="menu">
            <ul className="nav-list">
                <li className="nav-list-component">
                    <img width="40"
                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/1724px-Apple_logo_grey.svg.png" 
                         alt="apple"
                    />
                </li>
                <NavLink exact activeClassName="nav-link-active" to="/">
                <li className="nav-list-component">Home</li>
                </NavLink>
                <NavLink exact activeClassName="nav-link-active" to="/about">
                    <li className="nav-list-component">About</li>
                </NavLink>
            </ul>
            <div className="container-for-card">
                {user.isLoggedIn
                    ?
                    <BagInfo onOpen={openCart}/>
                    :
                    <p>Login to put items to bag</p>}
                {user.isLoggedIn
                    ?
                    <button onClick={authorizationMenuOpen} className="logout-btn">
                        Logout
                    </button>
                    :
                    <button onClick={authorizationMenuOpen} className="authorization-btn">
                        Login
                    </button>
                }
            </div>
        </div>
    );
};

export default Header;