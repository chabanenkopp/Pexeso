import React from 'react'
import {GetFromServer} from '../../services/service'

const getComment = obj => [obj.comment, obj.commentedon];
const getScore = obj => [obj.score, obj.playedon];


const withList = (Wrapped, type) => ({props}) => {
    const getFromServer = new GetFromServer();
    const {getComments} = getFromServer;
    const {getScores} = getFromServer;

    return <Wrapped {...props} getComments={type === 'comments' ? getComments : getScores}
                    getLabels={type === 'comments' ? getComment : getScore}/>
};

export default withList