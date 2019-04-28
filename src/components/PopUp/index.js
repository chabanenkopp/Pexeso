import React, {Component} from "react"
import "./PopUp.scss"
import SubmitButton from "../SubmitButton"
import {PostToServer} from "../../services/service.js"
import Tick from '../Tick'

export default class PopUp extends Component {
    postTo = new PostToServer();

    state = {
        player: "",
        comment: "",
        points: "",
        isTickVisible: false
    };

    getEmailValue = e => {
        const value = e.target.value;
        this.setState({player: value})
    };
    getCommentValue = e => {
        const value = e.target.value;
        const {points} = this.props;
        this.setState({comment: value});
        this.setState({points})
    };
    onSubmit = e => {
        e.preventDefault();
        const {player, comment, points} = this.state;
        const game = 'pexeso';
        const date = new Date();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const year = date.getUTCFullYear();
        const commentedon = `${year}-04-${day}`;
        const playedon = commentedon;
        this.postTo.postComment({player, game, comment, commentedon})
            .then(resp =>
            console.log(resp))
            .catch(err => console.log(err));
        this.postTo.postScore({player, game, points, playedon})
            .then(resp => console.log(resp))
            .catch(err => console.log(err));
        this.setState({
            player: "",
            comment: "",
            isisTickVisible: true
        });
    };

    render() {
        const {popUpText, buttonText} = this.props;
        const {player, comment, isisTickVisible} = this.state;
        return (
            <form className="popup-container" onSubmit={this.onSubmit}>
                <div className="popup">
                    <div className="text-win">{popUpText}</div>
                    <input
                        className="email"
                        placeholder="Your email"
                        type="email"
                        name="email"
                        size="35"
                        required
                        onChange={this.getEmailValue}
                        value={player}
                    />
                    <textarea
                        id="comment"
                        name="comment"
                        rows="5"
                        cols="33"
                        placeholder="Type your commentary here"
                        required
                        value={comment}
                        onChange={this.getCommentValue}
                    />
                    <SubmitButton text={buttonText} onSubmit={this.onSubmit}/>
                    {
                        isisTickVisible && <Tick />
                    }
                </div>
            </form>
        )
    }
}
