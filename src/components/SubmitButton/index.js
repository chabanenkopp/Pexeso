import React from "react"
import "./SubmitButton.scss"

const SubmitButton = ({ text }) => (
  <div className="submit-button" onClick={() => alert("Backend is NOT ready")}>
    {text}
  </div>
)

export default SubmitButton
