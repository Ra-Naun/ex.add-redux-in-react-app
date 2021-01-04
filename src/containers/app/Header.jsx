import React from "react";
import logo from "../../media/logo.svg";
import "./header.css";
import Auth from "./header/Auth";
import PropTypes from "prop-types";

const Header = (props) => {
    const { user} = props;
    const welcome_word = `Welcome, `;
    return (
        <>
            <header className="App-header">
                <div className="app__logo">
                    <img src={logo} alt="logo img" className="app__logo_img" />
                </div>
                <div className="welcome">
                    <p className="welcome__word">{welcome_word} </p>
                    <p className={`welcome__word_user ${user.isAuthorized ? "welcome__word_anon" : ""}`}>{user.name}</p>
                </div>
                <Auth user={user}/>
            </header>
        </>
    );
};

Header.propTypes = {
    user: PropTypes.object.isRequired
};

export default Header;
