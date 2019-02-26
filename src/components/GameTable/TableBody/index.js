import React from "react"
import "./TableBody.scss"
import TableRow from "../TableRow"

export default class TableBody extends React.Component {
  render() {
    return (
      <div className="table-holder">
        <TableRow
          rowData={this.props.rowData}
          showImage={this.props.showImage}
          getStatesFromRow={this.props.getStatesFromRow}
          countClicks={this.props.countClicks}
        />
      </div>
    )
  }
}
