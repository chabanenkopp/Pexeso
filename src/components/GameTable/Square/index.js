import React from "react"
import "./Square.scss"
const Square = ({ arrLinks, showImage, arrStatesFromRow, countClicks }) => {
  return (
    <div className="square-container">
      {arrLinks.map((obj, i) =>
        !arrStatesFromRow[i] ? (
          <div
            key={i}
            onClick={() => {
              showImage(obj)
              countClicks()
            }}
          />
        ) : (
          <img alt="pic" src={Object.values(obj)[0]} key={i} />
        )
      )}
    </div>
  )
}

export default Square
