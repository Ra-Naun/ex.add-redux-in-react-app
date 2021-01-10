import { connect } from "react-redux";
import Header from "./app/Header";

//actions
import { login, logout } from "../actions/userActions";

import PropTypes from "prop-types";

const HeaderContainer = ({ user, login, logout }) => {
    user.login = login;
    user.logout = logout;
    return <Header user={user}></Header>;
};

HeaderContainer.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        mid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        isFetching: PropTypes.bool.isRequired,
        isAuthorized: PropTypes.bool.isRequired,
        error: PropTypes.string,
    }).isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({ user: store.user });

const mapDispatchToProps = (dispatch) => ({
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
