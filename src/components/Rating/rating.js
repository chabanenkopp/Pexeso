import React, {Component} from 'react'
import {withRating} from '../hoc'
import Spinner from '../Spinner'
import './rating.scss'

class Rating extends Component {
    state = {
        averageRating: 0,
        playerRating: 'Type name',
        playerName: '',
        loading: true,
        loadingPlayer: false
    };

    componentDidMount() {
        this.displayAverageRating()
    }

    displayAverageRating = () => {
        const {getAverageRating} = this.props;
        getAverageRating().then(averageRating => {
            this.setState({
                averageRating
            });
            setTimeout(() => this.setState({loading: false}), 1000)
        })
    };

    displayPlayerRating = player => {
        const {getPlayerRating} = this.props;
        const {loadingPlayer} = this.state;
        this.setState({loadingPlayer: !loadingPlayer});
        getPlayerRating(player).then(playerRating => {
            this.setState({
                playerRating,
                playerName: ''
            });
            setTimeout(() => this.setState({loadingPlayer: false}), 1000)
        })
    };

    getPlayerName = e => {
        const playerName = e.target.value;
        this.setState({playerName})
    };

    onSubmit = e => {
        e.preventDefault();
        const {playerName} = this.state;
        this.displayPlayerRating(playerName)
    };

    render() {
        const {loading, averageRating, playerRating, playerName, loadingPlayer} = this.state;
        if (loading) return (<div className="spinner-wrapper" style={{display: "flex"}}><Spinner/></div>);
        return (
            <div>
                <div className="average"> Average Rating: {averageRating} </div>
                <form className="form-container" onSubmit={this.onSubmit}>
                    <div className="form-wrapper">
                        <input
                            className="text"
                            placeholder="Player name"
                            type="text"
                            required
                            onChange={this.getPlayerName}
                            value={playerName}
                        />
                        <button className="submit-player" onSubmit={this.onSubmit}>Submit</button>
                        {
                            !loadingPlayer ?
                                <div className="player-rating">Rating: {" "}
                                    <span
                                        style={{color: "#e36086", fontWeight: "bold"}}>{playerRating}
                                    </span>
                                </div>
                                :
                                <div style={{display: "flex"}}>
                                    <Spinner/>
                                </div>
                        }
                    </div>
                </form>
            </div>)
    }
};

export default withRating(Rating)
