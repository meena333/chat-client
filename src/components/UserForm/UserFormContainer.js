import React from 'react'
import UserForm from './UserForm'
import { setName } from '../../actions'
import { connect } from 'react-redux'

class UserFormContainer extends React.Component {

  state = { name: '' }

  onSubmit = async (event) => {
    event.preventDefault()
    this.props.setName(this.state.name)
    this.setState({ name: '' })
  }

  onChange = (event) => {
    const { value } = event.target
    this.setState({ name: value })
  }

  render() {
    return <UserForm onSubmit={this.onSubmit} value={this.state.name} onChange={this.onChange} user={this.props.user} />
  }
}

const mapDispatchToProps = {
  setName
}

export default connect(null, mapDispatchToProps)(UserFormContainer)