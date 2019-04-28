import React from 'react'
import {GetFromServer} from '../../services/service'

const withRating = Wrapped => ({props}) => {
    const getFromServer = new GetFromServer();
    const {getAverageRating} = getFromServer;
    const {getPlayerRating} = getFromServer;

    return <Wrapped {...props} getAverageRating={getAverageRating} getPlayerRating={getPlayerRating}/>
};

export default withRating