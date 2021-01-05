import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";

import "./App.css";

import Header from "./app/Header";
import ErrorBoundary from "../components/ErrorBoundary";
import Body from "./app/Body";

//actions
import { getPhotos } from "../actions/pageActions";
import { login, logout, setSearchMID } from "../actions/userActions";

import PropTypes from "prop-types";

import "../utils/VK_init"; //F12

function App({ user, login, logout, page, getPhotos, setSearchMID }) {
    user.login = login;
    user.logout = logout;
    user.setSearchMID = setSearchMID;
    page.getPhotos = getPhotos;

    const need_to_log_in = "Необходимо авторизоваться, чтобы продолжить...";

    return (
        <ErrorBoundary>
            <div className="App">
                <Header user={user} />
                {user.isAuthorized ? <Body page={page} user={user} /> : <p className="need_to_log_in">{need_to_log_in}</p>}
            </div>
        </ErrorBoundary>
    );
}

App.propTypes = {
    user: PropTypes.object.isRequired,
    page: PropTypes.object.isRequired,
    getPhotos: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({ user: store.user, page: store.page });

const mapDispatchToProps = (dispatch) => ({
    getPhotos: (year, mid) => dispatch(getPhotos(year, mid)),
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
    setSearchMID: (search_mid) => dispatch(setSearchMID(search_mid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
