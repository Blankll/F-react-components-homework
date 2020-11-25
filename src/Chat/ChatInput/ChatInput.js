import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  handleMessage = (event) => {
    this.setState({ message: event.target.value });
  };

  sendMessage = () => {
    const { message } = this.state;
    if (!message) {
      return;
    }
    this.props.reciveMessage(this.state.message);
    this.setState({ message: '' });
  };

  render() {
    return (
      <footer className="ChatInput">
        <input type="text" value={this.state.message} onChange={this.handleMessage} />
        <button type="button" onClick={this.sendMessage}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
