import { connect } from "react-redux";

import Body from "./app/Body";

//actions
import { getAllPhotos, setSearchMID, restoreDefaultSearchMID } from "../actions/pageActions";

import PropTypes from "prop-types";

const BodyContainer = ({ page, getPhotos, setSearchMID, restoreDefaultSearchMID, user }) => {
    page.getPhotos = getPhotos;
    page.setSearchMID = setSearchMID;
    page.restoreDefaultSearchMID = restoreDefaultSearchMID;

    const years_for_btns = new Map();

    page.photos.filter((photo) => {
        const year = new Date(photo.date * 1000).getFullYear();
        years_for_btns.set(year, year);
    });
    console.log("years_for_btns: ", years_for_btns);
    const need_to_log_in = "Необходимо авторизоваться, чтобы продолжить...";
    return <>{user.isAuthorized ? <Body page={page} years_for_btns={years_for_btns} /> : <p className="need_to_log_in">{need_to_log_in}</p>}</>;
};

BodyContainer.propTypes = {
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
    getPhotos: (year, likes, mid) => dispatch(getAllPhotos({ year, likes, mid })),
    setSearchMID: (search_mid) => dispatch(setSearchMID(search_mid)),
    restoreDefaultSearchMID: () => dispatch(restoreDefaultSearchMID()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BodyContainer);
