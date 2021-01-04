import React from "react";
import "./photoItem.css";
import PropTypes from "prop-types";

const PhotoItem = ({ photo }) => {
    return (
        <li className="el">
            <img className="el__photo" src={photo} alt="you_photo" />
        </li>
    );
};

PhotoItem.propTypes = {
    photo: PropTypes.string.isRequired,
};

export default PhotoItem;
