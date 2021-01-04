import React, { useState } from "react";
import "./body.css";
import PhotoItem from "./body/PhotoItem";
import PropTypes from "prop-types";

const Body = ({ year, photos, setYear }) => {
    const NO_PHOTOS = "В этом году у вас не было новых фотографий...";

    const onBtnYearClick = (e) => {
        const _year = +e.currentTarget.innerText;
        setYear(_year);
        // if (_year === 2020) {
        //     setPhotos(_ex_arr_photos);
        // } else setPhotos([]);
    };

    return (
        <div className="app__body container">
            <div className="top">
                <div className="top__filter">
                    <div className="top__filter__text">
                        <p>Мой топ фото по годам</p>
                    </div>
                    <div className="top__filter__years">
                        <button className="btn btn-info btn_year" onClick={onBtnYearClick}>
                            2017
                        </button>
                        <button className="btn btn-info btn_year" onClick={onBtnYearClick}>
                            2018
                        </button>
                        <button className="btn btn-info btn_year" onClick={onBtnYearClick}>
                            2019
                        </button>
                        <button className="btn btn-info btn_year" onClick={onBtnYearClick}>
                            2020
                        </button>
                        <button className="btn btn-info btn_year" onClick={onBtnYearClick}>
                            2021
                        </button>
                    </div>
                </div>
                <div className="top__main">
                    <div className="top_main__year">{year}</div>

                    <ul className="photo_list">{photos.length > 0 ? photos.map((photo, i) => <PhotoItem key={i} photo={photo} />) : <p className="no-photos">{NO_PHOTOS}</p>}</ul>
                </div>
            </div>
        </div>
    );
};

Body.propTypes = {
    year: PropTypes.number.isRequired,
    photos: PropTypes.array.isRequired,
};

export default Body;
