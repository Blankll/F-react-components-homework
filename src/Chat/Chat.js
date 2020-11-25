import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';
import { ROLE } from '../constants';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  handleMessage = (msgText) => {
    const { messages } = this.state;
    const message = {
      text: msgText,
      role: ROLE.CUSTOMER,
    };
    this.setState({ messages: messages.concat(message) });
    this.seekReply(msgText);
  };

  seekReply = (message) => {
    const reply = answersData.find((answer) => answer.tags.includes(message));
    if (reply) {
      setTimeout(() => {
        const { messages } = this.state;
        this.setState({ messages: messages.concat(reply) });
      }, 1000);
    }
  };

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput reciveMessage={this.handleMessage} />
      </main>
    );
  }
}

export default Chat;
