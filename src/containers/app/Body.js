import React, { useEffect } from "react";
import "./body.css";
import PhotoItem from "./body/PhotoItem";
import PropTypes from "prop-types";

const Body = ({ page, years_for_btns }) => {
    useEffect(() => {
        console.info("Body render");
    });

    const NO_PHOTOS = "В этом году у вас не было новых фотографий...";

    const onBtnYearClick = (e) => {
        const _year = +e.currentTarget.innerText;
        if (e.currentTarget.innerText.toString().toUpperCase() === "ALL") {
            console.log("ALL");
            console.log("page: ", page);
            page.getPhotos(0, -1, page.search_mid);
        } else {
            console.log("_year: ", _year);
            page.getPhotos(_year, -1, page.search_mid);
        }
    };

    const onChange = (e) => {
        const search_mid = e.currentTarget.value;

        if (!search_mid) {
            console.log("restoreDefaultSearchMID");
            page.restoreDefaultSearchMID();
        } else page.setSearchMID(search_mid);
    };

    return (
        <div className="app__body container">
            <div className="top">
                <div className="top__filter">
                    <div className="top__filter__text">
                        <details>
                            <div className="search_mid">
                                <label htmlFor="search_mid">Введите id пользователя или группы (группу со знаком "-" в начале): </label>
                                <input type="text" name="search_mid" id="search_mid" onChange={onChange} />
                            </div>
                        </details>

                        {!page.search_mid ? <p>Мой топ фото по годам</p> : <p>Топ фото по годам пользователя {page.search_mid}</p>}
                    </div>
                    <div className="top__filter__years">
                        <button className="btn btn-info btn_year" onClick={onBtnYearClick} disabled={page.isFetching}>
                            ALL
                        </button>
                        <button className="btn btn-info btn_year" onClick={onBtnYearClick} disabled={page.isFetching}>
                            2017
                        </button>
                        <button className="btn btn-info btn_year" onClick={onBtnYearClick} disabled={page.isFetching}>
                            2018
                        </button>
                        <button className="btn btn-info btn_year" onClick={onBtnYearClick} disabled={page.isFetching}>
                            2019
                        </button>
                        <button className="btn btn-info btn_year" onClick={onBtnYearClick} disabled={page.isFetching}>
                            2020
                        </button>
                        <button className="btn btn-info btn_year" onClick={onBtnYearClick} disabled={page.isFetching}>
                            2021
                        </button>
                    </div>
                </div>
                <div className="top__main">
                    {page.isFetching ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {page.year ? <div className="top_main__year">{`${page.year} год [${page.photos.length}]`}</div> : <div className="top_main__year">{`ALL [${page.photos.length}]`}</div>}

                            <ul className="photo_list">{page.photos.length > 0 ? page.photos.map((photo) => <PhotoItem key={photo.id} photo={photo} />) : <p className="no-photos">{NO_PHOTOS}</p>}</ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

Body.propTypes = {
    page: PropTypes.object.isRequired,
};

export default Body;
