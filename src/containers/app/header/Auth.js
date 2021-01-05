import React from "react";
import "./auth.css";
import PropTypes from "prop-types";

const Auth = ({ user }) => {
    const signIn = () => {
        console.log("`~~login");
        user.login();
    };
    const signOut = () => {
        console.log("`~~logout");
        user.logout();
    };

    return (
        <div className="toggle">
            <label className="label_text__toogle">Authorization: </label>
            <input className="input__toggle" type="checkbox" id="buttonThree" checked={user.isAuthorized} onChange={user.isAuthorized ? signOut : signIn} />
            <label className="label__toggle" htmlFor="buttonThree">
                <i></i>
            </label>
        </div>
    );
};

Auth.propTypes = {
    user: PropTypes.object.isRequired,
};

export default Auth;
