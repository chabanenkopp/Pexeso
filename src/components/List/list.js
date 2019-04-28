import React, {Component} from 'react'
import Spinner from '../Spinner'
import './list.scss'

class List extends Component {

    state = {
        comments: [],
        loading: true
    };

    componentDidMount() {
        this.displayComments()
    }

    displayComments = () => {
        const {getComments} = this.props;
        getComments().then(comments => {
            this.setState({
                comments: comments
            });
            setTimeout(() => this.setState({loading: false}), 1000)
        })
    };

    render() {
        const {loading, comments} = this.state;
        const {getLabels} = this.props;
        if (loading) return (<div className="spinner-wrapper"><Spinner/></div>);
        return (
            <div>
                {
                    comments.map(commentObj => {
                        const {id, player, game} = commentObj;
                        const labels = getLabels(commentObj);
                        return (
                            <div key={id} className="comments-wrapper"
                                 style={{marginBottom: "50px", marginTop: "50px", padding: "10px"}}>
                                <div className="wrapper-pg">
                                    <div className="player">Player:{" "}
                                        <span
                                            style={{color: "#de5086", fontWeight: "bold"}}>{player}
                                        </span>
                                    </div>
                                    <div className="game">Game: <b>{game}</b>
                                    </div>
                                </div>
                                <div className="wrapper-cd">
                                    <div className="comment">{labels[0]}</div>
                                    <div className="date">Posted on: <b>{labels[1]}</b></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default List