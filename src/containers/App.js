import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";

import "./App.css";

import Header from "./app/Header";
import ErrorBoundary from "../components/ErrorBoundary";
import Body from "./app/Body";

//actions
import { getPhotos } from "../actions/pageActions";
import { login } from "../actions/userActions";

import PropTypes from "prop-types";

function App({ user, login, page, getPhotos }) {
    user.login = login;
    page.getPhotos = getPhotos;

    const need_to_log_in = "Необходимо авторизоваться, чтобы продолжить...";

    return (
        <ErrorBoundary>
            <div className="App">
                <Header user={user} />
                {user.isAuthorized ? <Body page={page} /> : <p className="need_to_log_in">{need_to_log_in}</p>}
            </div>
        </ErrorBoundary>
    );
}

App.propTypes = {
    user: PropTypes.object.isRequired,
    page: PropTypes.object.isRequired,
    getPhotos: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({ user: store.user, page: store.page });

const mapDispatchToProps = (dispatch) => ({
    getPhotos: (year) => dispatch(getPhotos(year)),
    login: () => dispatch(login()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
