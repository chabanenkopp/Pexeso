import React, { Component } from "react"
import Home from "./components/Home"
import { countTrueValues } from "./functions/helpers"

export default class App extends Component {
  state = { tries: 0, tempTries: 0, pairs: 0, tempPairs: 0 }

  countTry = (keysBeforeSplit, childState) => {
    let homeState = Object.assign({}, childState)
    return () => {
      let indicator = true
      let newState = this.state
      let trueCounter = countTrueValues(homeState, 0)
      keysBeforeSplit.forEach(key => {
        const pair =
          key.slice(-1) === "a"
            ? key.replace(/.$/, "b")
            : key.replace(/.$/, "a")
        if (homeState[key] !== homeState[pair] && trueCounter % 2 === 0) {
          indicator = false
          homeState[key] = false
          homeState[pair] = false
        }
      })

      if (indicator) {
        newState.tempTries++
        if (newState.tempTries % 2 === 0)
          this.setState({ tries: newState.tempTries / 2 })
      }
    }
  }
  countPair = (keysBeforeSplit, childState) => {
    let homeState = Object.assign({}, childState)
    keysBeforeSplit.forEach(key => {
      const pair =
        key.slice(-1) === "a" ? key.replace(/.$/, "b") : key.replace(/.$/, "a")
      if (homeState[key] === homeState[pair] && homeState[key]) {
        homeState[key] = true
        homeState[pair] = true
      } else {
        homeState[key] = false
        homeState[pair] = false
      }
    })
    let trueCounter = countTrueValues(homeState, 0)
    if (trueCounter / 2 === 10) {
      document.body.style.overflow = "hidden"
    }
    return trueCounter / 2
  }
  render() {
    return (
      <Home
        countClicks={this.countTry}
        counter={this.state.tries}
        pairs={this.state.pairs}
        countPairs={this.countPair}
      />
    )
  }
}
