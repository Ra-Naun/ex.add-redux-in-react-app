import { connect } from "react-redux";

import Body from "./app/Body";

//actions
import { getAllPhotos, setSearchMID, restoreDefaultSearchMID } from "../actions/pageActions";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const BodyContainer = ({ page, getPhotos, setSearchMID, restoreDefaultSearchMID, user }) => {
    page.getPhotos = getPhotos;
    page.setSearchMID = setSearchMID;
    page.restoreDefaultSearchMID = restoreDefaultSearchMID;

    const [cachedMid, setCachedMid] = useState(null);
    const [prevPhotos, setPrevPhotos] = useState([]);
    const [yearListUniq, setYearListUniq] = useState([]);

    useEffect(() => {
        const isNeedUpdateYearListUniq = page.search_mid !== cachedMid && !isEqualPhotoArrays(page.photos, prevPhotos) && page.photos.length; //поменялся mid и загрузились его фотки впервые

        console.log(
            `$$$$$$$$$$$$$ useEffect page.search_mid: ${page.search_mid} cachedMid: : ${cachedMid} !== ${page.search_mid !== cachedMid} 
        page.photos: `,
            page.photos,
            ` prevPhotos: : `,
            prevPhotos,
            ` !== ${!isEqualPhotoArrays(page.photos, prevPhotos)}`
        );

        if (isNeedUpdateYearListUniq) {
            let new_YearListUniq = [];
            page.photos.forEach((photo) => {
                const year = new Date(photo.date * 1000).getFullYear();
                if (!new_YearListUniq.includes(year)) new_YearListUniq.push(year);
            });

            new_YearListUniq.sort();
            setYearListUniq(new_YearListUniq);

            setCachedMid(page.search_mid);
            setPrevPhotos(page.photos);
        }

        function isEqualPhotoArrays(arr1, arr2) {
            if (arr1.length !== arr2.length) {
                console.log("arr1.length !== arr2.length");
                return false;
            }
            let isEqualIDs = true;
            arr1.forEach((_, index) => {
                if (arr1[index].id !== arr2[index].id) {
                    isEqualIDs = false;
                }
            });
            console.log("isEqualIDs: ", isEqualIDs);
            return isEqualIDs;
        }
    }, [page.search_mid, page.photos, cachedMid, prevPhotos, yearListUniq]);

    const need_to_log_in = "Необходимо авторизоваться, чтобы продолжить...";
    return <>{user.isAuthorized ? <Body page={page} years_for_btns={yearListUniq} /> : <p className="need_to_log_in">{need_to_log_in}</p>}</>;
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
