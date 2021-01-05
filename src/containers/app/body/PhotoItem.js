import React from "react";
import "./photoItem.css";
import PropTypes from "prop-types";

const PhotoItem = ({ photo }) => {
    return (
        <li className="el">
            <div className="el_container">
                <div class="img_container">
                    <img className="el__photo" src={photo.sizes[photo.sizes.length - 1].url} alt="you_photo" />
                </div>
                <div className="likes">
                    {photo.likes.count} <p className="like">❤</p>
                </div>
            </div>
        </li>
    );
};

PhotoItem.propTypes = {
    photo: PropTypes.string.isRequired,
};

export default PhotoItem;
