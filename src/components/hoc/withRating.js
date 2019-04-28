import React from 'react'
import {GetFromServer, PostToServer} from '../../services/service'

const withRating = Wrapped => ({props}) => {
    const getFromServer = new GetFromServer();
    const postToServer = new PostToServer();
    const {getAverageRating} = getFromServer;
    const {getPlayerRating} = getFromServer;
    const {postRating} = postToServer;

    return <Wrapped {...props} getAverageRating={getAverageRating} getPlayerRating={getPlayerRating} postRating={postRating}/>
};

export default withRating