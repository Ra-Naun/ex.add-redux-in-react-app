import React from "react";
import "./auth.css";
import PropTypes from 'prop-types';

const Auth = ({user}) => {
    
    const signIn = () => {
        setTimeout(() => {
            user.setUserName("Alex");
            user.setIsAuthorized(true);
        }, 700);
    };
    const signOut = () => {
        setTimeout(() => {
            user.setUserName("anonymous");
            user.setIsAuthorized(false);
        }, 500);
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
}

Auth.propTypes = {

  }

export default Auth;