import React from 'react';
import './App.css';
import * as request from 'superagent'

class App extends React.Component {

  state = {
    message: '',
    messages: []
  }

  //manages received events from the server
  source = new EventSource(`http://localhost:5000/stream`)

  componentDidMount() {
    this.source.onmessage = (event) => {
      //console.log('state test: ', this.state)

      //get array from serialized data
      const messages = JSON.parse(event.data)

      this.setState({ messages })
    }
  }

  onSubmit = async (event) => {
    event.preventDefault()
    console.log('this.state.msg', this.state.message)

    await request.post('http://localhost:5000/message')
      .send({ message: this.state.message })

    this.setState({ message: '' })

  }

  onChange = (event) => {
    const { value } = event.target
    this.setState({ message: value })
  }

  render() {
    const messages = this.state.messages.map((message, index) => <p key={index}>
      {message}
    </p>)

    const form = <form onSubmit={this.onSubmit}>
      <input type='text' value={this.state.message} onChange={this.onChange} />
      <button type='submit'>Send</button>
    </form>
    return <main>
      {form}
      {messages}
    </main>
  }
}

export default App;
