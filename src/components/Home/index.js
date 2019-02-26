import React, { Component } from "react"
import "./Home.scss"
import TableBody from "../GameTable/TableBody"
import Octicon, { MarkGithub } from "@githubprimer/octicons-react"
import CountScreen from "../CountScreen"
import PopUp from "../PopUp"
import {
  prepareState,
  makePairs,
  shuffle,
  splitArray
} from "../../functions/helpers.js"
import {
  countedTriesText,
  guessedPairsText,
  submitButtonText,
  gameTitle,
  popUpText
} from "../../constants/titles.js"

const imageJSON = require("../../data/ImageLinks.json")

const rowDataBeforeSplit = shuffle(makePairs(imageJSON))
const rowData = splitArray(rowDataBeforeSplit)

const keysBeforeSplit = []
for (let i = 0; i < rowDataBeforeSplit.length; i++) {
  keysBeforeSplit.push(Object.keys(rowDataBeforeSplit[i])[0])
}
export default class Home extends Component {
  state = prepareState(imageJSON)

  showImage = obj => {
    let imageIndex = Object.keys(obj)
    const newState = this.state
    let notSkip = true
    const currentValues = Object.values(newState)
    let trueValues = 0
    for (let i = 0; i < currentValues.length; i++) {
      if (currentValues[i] === true) {
        trueValues++
      }
    }
    keysBeforeSplit.forEach(key => {
      const pair =
        key.slice(-1) === "a" ? key.replace(/.$/, "b") : key.replace(/.$/, "a")
      if (newState[key] !== newState[pair] && trueValues % 2 === 0) {
        newState[key] = false
        newState[pair] = false
        notSkip = false
      }
    })

    this.setState(newState)
    if (trueValues === 0 || (notSkip || trueValues % 2 !== 0)) {
      newState[imageIndex[0]] = true
      this.setState(newState)
    }
  }
  getStatesFromRow = arrRowData => {
    let arrStates = []
    let tempArr = []
    for (let i = 0; i < arrRowData.length; i++) {
      const elm = Object.keys(arrRowData[i])
      tempArr.push(elm[0])
    }
    for (let i = 0; i < tempArr.length; i++) {
      arrStates.push(this.state[tempArr[i]])
    }
    return arrStates
  }
  render() {
    return (
      <div className="content">
        <div className="grid-container">
          {this.props.countPairs(keysBeforeSplit, this.state) === 10 && (
            <PopUp popUpText={popUpText} buttonText={submitButtonText} />
          )}
          <div className="top">
            <div>{gameTitle}</div>
          </div>
          <div className="left">
            <div className="count-wrapper tries">
              <CountScreen
                counter={this.props.counter}
                text={countedTriesText}
              />
            </div>
            <div className="count-wrapper pairs">
              <CountScreen
                counter={this.props.countPairs(keysBeforeSplit, this.state)}
                text={guessedPairsText}
              />
            </div>
          </div>
          <div className="middle">
            <TableBody
              rowData={rowData}
              showImage={this.showImage}
              getStatesFromRow={this.getStatesFromRow}
              countClicks={this.props.countClicks(keysBeforeSplit, this.state)}
            />
          </div>
          <div className="right">
            <div />
          </div>
          <div className="bottom">
            <div className="bottom__left" />
            <div className="bottom__middle">
              <div className="octicon-container">
                <a
                  style={{ color: "white" }}
                  href="https://github.com/chabanenkopp"
                >
                  <Octicon icon={MarkGithub} size="large" />
                </a>
              </div>
            </div>
            <div className="bottom__right" />
          </div>
        </div>
      </div>
    )
  }
}
