import React from 'react'
import './select.scss'

const Select = ({getRating, rating}) => {
    return (
        <div className="select">
            <select className="select-text" required onChange={getRating} value={rating}>
                <option value="" disabled selected></option>
                <option value="1">1 point</option>
                <option value="2">2 points</option>
                <option value="3">3 points</option>
                <option value="4">4 points</option>
                <option value="5">5 points</option>
                <option value="6">6 points</option>
                <option value="7">7 points</option>
                <option value="8">8 points</option>
                <option value="9">9 points</option>
                <option value="10">10 points</option>
            </select>
            <span className="select-highlight"></span>
            <span className="select-bar"></span>
            <label className="select-label">Rate the Game</label>
        </div>
    )
};

export {Select}