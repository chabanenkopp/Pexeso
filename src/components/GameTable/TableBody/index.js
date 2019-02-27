import React from "react"
import "./TableBody.scss"
import Square from "../Square"

const TableBody = ({ rowData, showImage, getStatesFromRow, countClicks }) => {
  return (
    <div className="table-holder">
      <div className="tr-container">
        {rowData.map((arrWithFiveObj, i) => (
          <div className="tr-body" key={i}>
            <Square
              arrLinks={arrWithFiveObj}
              showImage={showImage}
              arrStatesFromRow={getStatesFromRow(arrWithFiveObj)}
              countClicks={countClicks}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TableBody
