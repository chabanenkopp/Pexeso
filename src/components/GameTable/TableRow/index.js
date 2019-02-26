import React from "react"
import "./TableRow.scss"
import Square from "../Square"

const TableRow = ({ rowData, showImage, getStatesFromRow, countClicks }) => {
  return (
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
  )
}

export default TableRow
