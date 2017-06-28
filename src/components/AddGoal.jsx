import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalRef, existingUsersRef } from '../firebase';

class AddGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      users: [],
      assignedTo: '',
      alert: false
    }
  }

  componentDidMount() {
    existingUsersRef.on('value', snap => {
      let allUsers = [];
      snap.forEach(user => {
        const { email } = user.val();
        allUsers.push({email});
      })
      this.setState({users: allUsers})
    })

  }

  addGoal() {
    //console.log('this.state', this.state);
    if (this.state.title === '') {
      //alert('You must fill in the form')
      this.setState({alert: true})
    } else {

    const { title, assignedTo } = this.state;
    const { email } = this.props.user;
    goalRef.push({title, email, assignedTo});
    this.setState({title: '', alert: false});
    //console.log('added to db', this.props)
  }
  }
  render() {
    //console.log('allusers', this.state.users)
    return (
      <div className='form-inline'>
        <div className='form-group'>
          <input
            value={this.state.title}
            type='text'
            placeholder='Add a goal'
            className='form-control'
            style={{margin: '5px'}}
            onChange={event => this.setState({title: event.target.value})}
            onKeyPress={event => { if (event.key === 'Enter') {this.addGoal()}}}
            />
          <select
            className='form-control'
            style={{margin: '5px'}}
            onChange={event => this.setState({assignedTo: event.target.value})}
            onKeyPress={event => { if (event.key === 'Enter') {this.addGoal()}}}
            >
            {
              this.state.users.map( (user, index) => {
                return (
                  <option key={index}>{user.email}</option>
                )
              })
            }
          </select>
          <button
            type='button'
            className='btn btn-success'
            style={{margin: '5px'}}
            onClick={ () => this.addGoal() }
            >Submit
          </button>
        </div>
        {this.state.alert === true ?
          <div style={{margin: '5px'}} className="alert alert-danger alert-sm" role="alert">
            <strong>Error!</strong> You need to add a goal first.
          </div>
          : null}
      </div>

    )
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    user,

  }
}


  export default connect(mapStateToProps, null)(AddGoal);
