import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";

import "./App.css";

import Header from "./app/Header";
import ErrorBoundary from "../components/ErrorBoundary";
import Body from "./app/Body";

//actions
import { setYear } from "../actions/pageActions";
import { setIsAuthorized, setUserName } from "../actions/userActions";

import logo from "../media/logo.svg"; //~dell
import PropTypes from "prop-types";

function App({ user, page, setYear, setUserName, setIsAuthorized }) {
    user.setIsAuthorized = setIsAuthorized;
    user.setUserName = setUserName;
    console.log("App user:", user);

    const _ex_arr_photos = [logo, logo, logo, logo, logo, logo, logo, logo, logo];

    return (
        <ErrorBoundary>
            <div className="App">
                <Header user={user} />
                <Body year={page.year} photos={page.photos} setYear={setYear} />
            </div>
        </ErrorBoundary>
    );
}

App.propTypes = {
    user: PropTypes.object.isRequired,
    page: PropTypes.object.isRequired,
    setYear: PropTypes.func.isRequired,
    setUserName: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({ user: store.user, page: store.page });

const mapDispatchToPros = (dispatch) => ({
    setYear: (year) => dispatch(setYear(year)),
    setUserName: (name) => dispatch(setUserName(name)),
    setIsAuthorized: (isAuthorized) => dispatch(setIsAuthorized(isAuthorized)),
});

export default connect(mapStateToProps, mapDispatchToPros)(App);
