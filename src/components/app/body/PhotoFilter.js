import React from "react";

import PropTypes from "prop-types";
import "./photoFilter.css";
import FilterButtons from "./photoFilter/FilterButtons";
import FilterText from "./photoFilter/FilterText";

const PhotoFilter = ({ isFetching, restoreDefaultSearchMID, getPhotos, search_mid, setSearchMID, yearListUniq }) => {
    return (
        <div className="top">
            <div className="top__filter">
                <FilterText restoreDefaultSearchMID={restoreDefaultSearchMID} setSearchMID={setSearchMID} search_mid={search_mid} />
                <FilterButtons getPhotos={getPhotos} search_mid={search_mid} yearListUniq={yearListUniq} isFetching={isFetching} />
            </div>
        </div>
    );
};

PhotoFilter.propTypes = {};

export default PhotoFilter;
