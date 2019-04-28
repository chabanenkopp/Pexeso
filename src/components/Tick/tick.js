import React from 'react'
import './tick.scss'

const Tick = () => {
    return (
        <div className="tick-container">
            <div className="tick-wrapper">
                <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="180"
                    height="180"
                    viewBox="0 0 80 80">
                    <title>tick-mark</title>
                    <path
                        className="path-circle"
                        stroke="#de5086"
                        stroke-width="3"
                        fill="none"
                        stroke-linecap="butt"
                        stroke-linejoin="butt"
                        d="M 75,40 A 35,35   0 0 1 40,75  M40,75 A 35,35   0 0 1 5,40  M5,40 A 35,35   0 0 1 40,5  M40,5 A 35,35   0 0 1 75,40"/>
                    <path
                        className="path-tick"
                        stroke="#de5086"
                        stroke-width="3"
                        fill="none"
                        stroke-linecap="butt"
                        stroke-linejoin="butt"
                        d="M 25,45 35,55 60,30"/>
                </svg>
            </div>
        </div>
    )
};

export default Tick