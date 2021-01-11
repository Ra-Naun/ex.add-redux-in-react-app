import React from "react";
import PropTypes from "prop-types";
import BtnYearItem from "./filterButtons/btnYearItem";
import "./filterButtons.css";

const FilterButtons = ({ getPhotos, search_mid, years_for_btns, isFetching }) => {
    const onBtnYearClick = (e) => {
        const _year = +e.currentTarget.innerText;
        if (isNaN(_year)) {
            getPhotos(0, -1, search_mid);
        } else {
            getPhotos(_year, -1, search_mid);
        }
    };
    return (
        <ul className="top__filter__years">
            <li className="btn_year-el">
                <button className="btn btn-info btn_year" onClick={(e) => onBtnYearClick(e, "ALL")} disabled={isFetching}>
                    ALL
                </button>
            </li>
            {years_for_btns.map((year) => (
                <BtnYearItem key={year} onBtnYearClick={onBtnYearClick} year={year} isFetching={isFetching} />
            ))}
        </ul>
    );
};

FilterButtons.propTypes = {};

export default FilterButtons;
