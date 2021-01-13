import React, { useEffect } from "react";
import "./body.css";
import PropTypes from "prop-types";
import Photos from "./body/Photos";
import PhotoFilter from "./body/PhotoFilter";

const Body = ({ page, yearListUniq }) => {
    useEffect(() => {
        console.info("Body render");
    });

    return (
        <div className="app__body container">
            <PhotoFilter
                isFetching={page.isFetching}
                restoreDefaultSearchMID={page.restoreDefaultSearchMID}
                getPhotos={page.getPhotos}
                search_mid={page.search_mid}
                setSearchMID={page.setSearchMID}
                yearListUniq={yearListUniq}
            />
            {page.error ? <div></div> : <Photos isFetching={page.isFetching} year={page.year} photos={page.photos} />}
        </div>
    );
};

Body.propTypes = {
    page: PropTypes.object.isRequired,
};

export default Body;
