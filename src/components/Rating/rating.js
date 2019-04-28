import React, {Component} from 'react'
import {withRating} from '../hoc'
import Spinner from '../Spinner'
import {Select} from './select'
import './rating.scss'

class Rating extends Component {
    state = {
        averageRating: 0,
        playerRating: 'Type name',
        playerName: '',
        loading: true,
        loadingPlayer: false,
        loadingSelect: false,
        player: '',
        rating: ''
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

    getPlayerSelect = e => {
        const player = e.target.value;
        this.setState({player});
    };

    getRating = e => {
        const rating = e.target.value;
        this.setState({rating});
        console.log(rating)
    };

    postNewRating = e => {
        e.preventDefault();
        const postRating = this.props.postRating;
        let {player, rating} = this.state;
        this.setState({loadingSelect: true});
        rating = Number(rating);
        const game = 'pexeso';
        const date = new Date();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const year = date.getUTCFullYear();
        const ratedon = `${year}-04-${day}`;
        postRating({player, game, rating, ratedon})
            .then(resp => {
                console.log(resp);
                setTimeout(() => this.setState({loadingSelect: false}), 1000);
            })
            .catch(err => console.log(err));
    };

    render() {
        const {loading, averageRating, playerRating, playerName, loadingPlayer, player, rating, loadingSelect} = this.state;
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
                <form className="select-wrapper" onSubmit={this.postNewRating}>
                    {
                        !loadingSelect ? (
                            <React.Fragment>
                                <Select getRating={this.getRating} rating={rating}/>
                                <input
                                    className="text"
                                    placeholder="Player name"
                                    type="text"
                                    required
                                    onChange={this.getPlayerSelect}
                                    value={player}
                                    style={{marginTop: '20px'}}
                                />
                                <button className="submit-player" onSubmit={this.postNewRating}>Submit</button>
                            </React.Fragment>
                        ) : (
                            <div style={{display: "flex"}}>
                                <Spinner/>
                            </div>
                        )
                    }
                </form>
            </div>
        )
    }
}

export default withRating(Rating)
