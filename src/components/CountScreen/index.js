import React from "react"
import "./CountScreen.scss"

const CountScreen = ({ counter, text }) => (
  <div className="count-screen">
    {text} {counter}
  </div>
)

export default CountScreen
