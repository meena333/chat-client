import React from 'react'
import * as request from 'superagent'
import MessageForm from './MessageForm'

export default class MessageFormContainer extends React.Component {

  state = { message: '' }

  onSubmit = async (event) => {
    event.preventDefault()
    //console.log('this.state.msg', this.state.message)
    //await request.post('http://localhost:5000/message')
    await request.post('https://thawing-hollows-97855.herokuapp.com/message')
      .send({
        message: this.state.message,
        user: this.props.user
      })

    this.setState({ message: '' })
  }

  onChange = (event) => {
    const { value } = event.target
    this.setState({ message: value })
  }

  render() {
    return <MessageForm onSubmit={this.onSubmit} value={this.state.message} onChange={this.onChange} />
  }
}