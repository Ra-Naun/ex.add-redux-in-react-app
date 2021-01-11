import React from "react";
import "./btnYearItem.css";
import PropTypes from "prop-types";

const BtnYearItem = ({ onBtnYearClick, year, isFetching }) => {
    return (
        <li className="btn_year-el">
            <button
                className="btn btn-info btn_year"
                onClick={(e) => {
                    onBtnYearClick(e, year);
                }}
                disabled={isFetching}
            >
                {year}
            </button>
        </li>
    );
};

BtnYearItem.propTypes = {};

export default BtnYearItem;
