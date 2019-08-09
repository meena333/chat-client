import React from 'react';
import './App.css';
import { allMessages } from './actions'
import { connect } from 'react-redux';
import MessageFormContainer from './components/MessageForm/MessageFormContainer'
import UserFormContainer from './components/UserForm/UserFormContainer'

class App extends React.Component {

  //manages received events from the server
  source = new EventSource(`https://thawing-hollows-97855.herokuapp.com/stream`)
  //source = new EventSource('http://localhost:5000/stream')

  componentDidMount() {
    this.source.onmessage = (event) => {
      //get array from serialized data
      const messages = JSON.parse(event.data)
      this.props.allMessages(messages)
    }
  }

  render() {
    //when going from react to redux, change this.state to this.props
    const messages = this.props.messages.map((message, index) => <p key={index}>
      {message.user}: {message.text}
    </p>)
    return <main>
      <UserFormContainer user={this.props.user} />
      <MessageFormContainer user={this.props.user} />
      {messages}
    </main>
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    user: state.user
  }
}

const mapDispatchToProps = {
  allMessages
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
