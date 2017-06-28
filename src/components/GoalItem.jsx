import React, { Component } from 'react';
import { completeGoalRef, goalRef } from '../firebase';
import { connect } from 'react-redux';

class GoalItem extends Component {
  completeGoal() {
    const { email } = this.props.user;
    const { title, serverKey } = this.props.goal;
    //console.log('serverkey', serverKey);
    goalRef.child(serverKey).remove();
    completeGoalRef.push({email, title});
  }

  render() {
    //console.log('props.goal',this.props.goal)
    const { email, title, assignedTo } = this.props.goal;
    return (
      <div style={{margin: '5px'}}>
        <strong>{title} </strong>
        <span style={{marginRight: '5px'}}>Submitted by <em>{email}</em>.</span>
        <span style={{marginRight: '5px'}}>Assigned to <em>{assignedTo}</em></span>
        <button
          className='btn btn-sm btn-primary'
          onClick={() => this.completeGoal()}>
            Complete
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    user
  }
}

export default connect(mapStateToProps, null)(GoalItem);
