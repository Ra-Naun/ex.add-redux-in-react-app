import React from "react";

//styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//childs
import ErrorBoundary from "./ErrorBoundary";
import HeaderContainer from "../containers/HeaderContainer";
import BodyContainer from "../containers/BodyContainer";

import "../utils/VK_init"; //F12

function App() {
    return (
        <ErrorBoundary>
            <div className="App">
                <HeaderContainer />
                <BodyContainer />
            </div>
        </ErrorBoundary>
    );
}

export default App;
