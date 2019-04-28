import React from 'react'
import CountScreen from '../CountScreen'

const Counters = ({counterPairs, textPairs, counterTries, textTries}) => {
    return (
        <div className="counters-container" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
        }}>
            <div style={{padding: "10px"}}>
                <CountScreen counter={counterTries} text={textTries}/>
            </div>
            <div style={{padding: "10px"}}>
                <CountScreen counter={counterPairs} text={textPairs}/>
            </div>
        </div>
    )
};

export default Counters

