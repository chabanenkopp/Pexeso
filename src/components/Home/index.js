import React, {Component} from "react"
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import Octicon, {MarkGithub} from "@githubprimer/octicons-react"
import TableBody from "../GameTable/TableBody"
import Counters from "../Counters"
import PopUp from "../PopUp"
import {Comments, Scores} from '../Stats/stats'
import Rating from '../Rating'
import "./Home.scss"
import {
    prepareState,
    makeKeysBeforeSplit,
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


const imageJSON = require("../../data/imageLinks.json");

const rowDataBeforeSplit = shuffle(makePairs(imageJSON));

const rowData = splitArray(rowDataBeforeSplit);

const keysBeforeSplit = makeKeysBeforeSplit(rowDataBeforeSplit);
export default class Home extends Component {

    state = prepareState(imageJSON);

    showImage = obj => {
        let imageIndex = Object.keys(obj);
        const newState = this.state;
        let notSkip = true;
        const currentValues = Object.values(newState);
        let trueValues = 0;
        for (let i = 0; i < currentValues.length; i++) {
            if (currentValues[i] === true) {
                trueValues++
            }
        }
        keysBeforeSplit.forEach(key => {
            const pair =
                key.slice(-1) === "a" ? key.replace(/.$/, "b") : key.replace(/.$/, "a");
            if (newState[key] !== newState[pair] && trueValues % 2 === 0) {
                newState[key] = false;
                newState[pair] = false;
                notSkip = false
            }
        });

        this.setState(newState);
        if (trueValues === 0 || (notSkip || trueValues % 2 !== 0)) {
            newState[imageIndex[0]] = true;
            this.setState(newState)
        }
    };
    getStatesFromRow = arrRowData => {
        let arrStates = [];
        let tempArr = [];
        for (let i = 0; i < arrRowData.length; i++) {
            const elm = Object.keys(arrRowData[i]);
            tempArr.push(elm[0])
        }
        for (let i = 0; i < tempArr.length; i++) {
            arrStates.push(this.state[tempArr[i]])
        }
        return arrStates
    };

    render() {
        const {countPairs, countClicks, counter} = this.props;
        return (
            <div className="content">
                <Router>
                    <div className="grid-container">
                        {countPairs(keysBeforeSplit, this.state) === 1 && (
                            <PopUp
                                popUpText={popUpText}
                                buttonText={submitButtonText}
                                points={counter}
                            />
                        )}
                        <div className="top"
                             style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <div>{gameTitle}</div>
                            <Route path="/" exact render={() => (
                                <div className="link-button"><Link to="/stats/">Stats</Link></div>
                            )}
                            />
                            <Route path="/stats" exact render={() => (
                                <div className="link-button"><Link to="/">Home</Link></div>
                            )}
                            />

                        </div>
                        <div className="flex" style={{minHeight: '76vh'}}>
                            <div className="left">
                                <Route path="/" exact render={() => (
                                    <Counters
                                        counterTries={counter}
                                        textTries={countedTriesText}
                                        counterPairs={countPairs(keysBeforeSplit, this.state)}
                                        textPairs={guessedPairsText}
                                    />
                                )}
                                />
                                <Route path="/stats" component={Scores}/>
                            </div>
                            <div className="middle">
                                <Route path="/" exact render={() => (
                                    <TableBody
                                        rowData={rowData}
                                        showImage={this.showImage}
                                        getStatesFromRow={this.getStatesFromRow}
                                        countClicks={countClicks(keysBeforeSplit, this.state)}
                                    />
                                )}
                                />
                                <Route path="/stats" component={Comments}/>
                            </div>
                            <div className="right">
                                {/*<div/>*/}
                                <Route path="/stats" component={Rating}/>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="bottom__left"/>
                            <div className="bottom__middle">
                                <div className="octicon-container">
                                    <a
                                        style={{color: "white"}}
                                        href="https://github.com/chabanenkopp"
                                    >
                                        <Octicon icon={MarkGithub} size="large"/>
                                    </a>
                                </div>
                            </div>
                            <div className="bottom__right"/>
                        </div>
                    </div>
                </Router>
            </div>
        )
    }
}
