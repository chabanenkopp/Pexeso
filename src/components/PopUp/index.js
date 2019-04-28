import React, { Component } from "react"
import "./PopUp.scss"
import SubmitButton from "../SubmitButton"
import { PostToServer } from "../../services/service.js"

export default class PopUp extends Component {
  ToServer = new PostToServer();

  state = {
    email: "",
    comment: "",
    score: ""
  };

  getEmailValue = e => {
    const value = e.target.value;
    this.setState({ email: value })
  };
  getCommentValue = e => {
    const value = e.target.value;
    const { score } = this.props;
    this.setState({ comment: value });
    this.setState({ score })
  };
  onSubmit = e => {
    e.preventDefault();
    const { email, comment, score } = this.state;
    this.ToServer.postAndGetResp({ email, comment, score }).then(resp =>
      console.log(resp)
    );
    this.setState({
      email: "",
      comment: ""
    })
  };

  render() {
    const { popUpText, buttonText } = this.props;
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
            value={this.state.email}
          />

          <textarea
            id="comment"
            name="comment"
            rows="5"
            cols="33"
            placeholder="Type your commentary here"
            required
            value={this.state.comment}
            onChange={this.getCommentValue}
          />
          <SubmitButton text={buttonText} onSubmit={this.onSubmit} />
        </div>
      </form>
    )
  }
}
