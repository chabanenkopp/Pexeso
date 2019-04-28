import React from "react"
import "./spinner.scss"

const Spinner = () => (
    <div className="lds-css ng-scope">
        <div className="lds-double-ring">
            <div />
            <div />
        </div>
    </div>
);

export default Spinner
