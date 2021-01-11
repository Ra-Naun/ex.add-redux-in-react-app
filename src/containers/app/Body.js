import React, { useEffect } from "react";
import "./body.css";
import PhotoItem from "./body/PhotoItem";
import PropTypes from "prop-types";
import FilterButtons from "./body/FilterButtons";
import FilterText from "./body/FilterText";
import Photos from "./body/Photos";

const Body = ({ page, years_for_btns }) => {
    useEffect(() => {
        console.info("Body render");
    });

    return (
        <div className="app__body container">
            <div className="top">
                <div className="top__filter">
                    <FilterText restoreDefaultSearchMID={page.restoreDefaultSearchMID} setSearchMID={page.setSearchMID} search_mid={page.search_mid} />
                    <FilterButtons getPhotos={page.getPhotos} search_mid={page.search_mid} years_for_btns={years_for_btns} isFetching={page.isFetching} />
                </div>
            </div>
            <Photos isFetching={page.isFetching} year={page.year} photos={page.photos} />
        </div>
    );
};

Body.propTypes = {
    page: PropTypes.object.isRequired,
};

export default Body;
