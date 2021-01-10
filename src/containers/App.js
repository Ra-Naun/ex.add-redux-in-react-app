import React from "react";
import { connect } from "react-redux";

//styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//childs
import ErrorBoundary from "../components/ErrorBoundary";
import HeaderContainer from "./HeaderContainer";
import Body from "./app/Body";

//actions
import { getPhotos, setSearchMID, restoreDefaultSearchMID } from "../actions/pageActions";

import PropTypes from "prop-types";

import "../utils/VK_init"; //F12

function App({ page, getPhotos, setSearchMID, restoreDefaultSearchMID, user }) {
    page.getPhotos = getPhotos;
    page.setSearchMID = setSearchMID;
    page.restoreDefaultSearchMID = restoreDefaultSearchMID;

    const need_to_log_in = "Необходимо авторизоваться, чтобы продолжить...";

    return (
        <ErrorBoundary>
            <div className="App">
                <HeaderContainer />
                {user.isAuthorized ? <Body page={page} user_mid={user.mid} /> : <p className="need_to_log_in">{need_to_log_in}</p>}
            </div>
        </ErrorBoundary>
    );
}

App.propTypes = {
    page: PropTypes.shape({
        search_mid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        year: PropTypes.number,
        photos: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string,
    }).isRequired,
    getPhotos: PropTypes.func.isRequired,
    setSearchMID: PropTypes.func.isRequired,
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        mid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        isFetching: PropTypes.bool.isRequired,
        isAuthorized: PropTypes.bool.isRequired,
        error: PropTypes.string,
    }).isRequired,
};

const mapStateToProps = (store) => ({ user: store.user, page: store.page });

const mapDispatchToProps = (dispatch) => ({
    getPhotos: (year, mid) => dispatch(getPhotos(year, mid)),
    setSearchMID: (search_mid) => dispatch(setSearchMID(search_mid)),
    restoreDefaultSearchMID: () => dispatch(restoreDefaultSearchMID()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
