import React from "react"
import "./PopUp.scss"
import SubmitButton from "../SubmitButton"

const PopUp = ({ popUpText, buttonText }) => {
  return (
    <div className="popup-container">
      <div className="popup">
        <div className="text-win">{popUpText}</div>
        <SubmitButton text={buttonText} />
      </div>
    </div>
  )
}

export default PopUp
