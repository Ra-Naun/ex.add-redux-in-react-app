import React from "react";
import "./body.css";
import PhotoItem from "./body/PhotoItem";
import PropTypes from "prop-types";

const Body = ({ page }) => {
    const NO_PHOTOS = "В этом году у вас не было новых фотографий...";

    console.log("Body page:", page);

    const onBtnYearClick = (e) => {
        const _year = +e.currentTarget.innerText;
        page.getPhotos(_year);
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
                    <div className="top_main__year">{`${page.year} год [${page.photos.length}]`}</div>

                    <ul className="photo_list">{page.photos.length > 0 ? page.photos.map((photo, i) => <PhotoItem key={photo.id} photo={photo} />) : <p className="no-photos">{NO_PHOTOS}</p>}</ul>
                </div>
            </div>
        </div>
    );
};

Body.propTypes = {
    page: PropTypes.object.isRequired,
};

export default Body;
