import React, { Component } from 'react';
import { firebaseApp, existingUsersRef } from '../firebase';
import { Link } from 'react-router-dom';


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      }
    }
  }

  signUp() {
    const { email, password } = this.state;
    //existingUsersRef.push({email});
    existingUsersRef.orderByChild("email").equalTo(email).once("value", function(snapshot) {
      const userData = snapshot.val();
      if (!userData) {
        existingUsersRef.push({email})
      }
    })
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    .catch(error => {
      this.setState({error: error})
    })
  }
  render() {
    return (
      <div className='form-inline' style={{margin: '5%'}}>
        <h2>Sign Up</h2>
        <div className='form-group'>
          <input className='form-control' type='text' placeholder='email' style={{marginRight: '5px'}} onChange={event => this.setState({email: event.target.value})}/>
          <input className='form-control' type='password' placeholder='password' style={{marginRight: '5px'}} onChange={event => this.setState({password: event.target.value})}/>
          <button className='btn btn-primary' type='button' onClick={() => this.signUp()}>Sign Up</button>
        </div>
        <div>{this.state.error.message}</div>
        <div><Link to={'/signin'}>Already a user? Sign in instead.</Link></div>
      </div>
    )
  }
}


export default SignUp;
