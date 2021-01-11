import React from "react";
import "./photoItem.css";
import PhotoItem from "./PhotoItem";
import PropTypes from "prop-types";

const Photos = ({ isFetching, year, photos }) => {
    const NO_PHOTOS = "В этом году не было новых фотографий...";
    return (
        <div className="top__main">
            {isFetching ? (
                <p>Loading...</p>
            ) : (
                <>
                    {year ? <div className="top_main__year">{`${year} год [${photos.length}]`}</div> : <div className="top_main__year">{`ALL [${photos.length}]`}</div>}

                    <ul className="photo_list">{photos.length > 0 ? photos.map((photo) => <PhotoItem key={photo.id} photo={photo} />) : <p className="no-photos">{NO_PHOTOS}</p>}</ul>
                </>
            )}
        </div>
    );
};

Photos.propTypes = {};

export default Photos;
