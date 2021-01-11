import React from "react";
import "./filterText.css";
import PropTypes from "prop-types";

const FilterText = ({ restoreDefaultSearchMID, setSearchMID, search_mid }) => {
    const onChange = (e) => {
        const search_mid = e.currentTarget.value;

        if (!search_mid) {
            console.log("restoreDefaultSearchMID");
            restoreDefaultSearchMID();
        } else setSearchMID(search_mid);
    };
    return (
        <div className="top__filter__text">
            <details>
                <div className="search_mid">
                    <label htmlFor="search_mid">Введите id пользователя или группы (группу со знаком "-" в начале): </label>
                    <input type="text" name="search_mid" id="search_mid" onChange={onChange} />
                </div>
            </details>

            {!search_mid ? <p>Мой топ фото по годам</p> : <p>Топ фото по годам пользователя {search_mid}</p>}
        </div>
    );
};

FilterText.propTypes = {};

export default FilterText;
