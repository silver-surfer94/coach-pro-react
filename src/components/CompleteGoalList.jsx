import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCompleted } from '../actions';
import { completeGoalRef } from '../firebase';

class CompleteGoalList extends Component {
  componentDidMount() {
    completeGoalRef.on('value', snap => {
      let completeGoals = [];
      snap.forEach(completeGoal => {
        const { email, title } = completeGoal.val();
        const serverKey = completeGoal.key;
        completeGoals.push({email, title, serverKey});
      })
      //console.log('completeGoals', completeGoals);
      this.props.setCompleted(completeGoals);
    })
  }

  clearOne(serverKey) {
    //console.log('this.props', serverKey);
    completeGoalRef.child(serverKey).remove();
  }

  clearCompleted() {
    //this passes an empty array to firebase and resets it to an empty array
    completeGoalRef.set([]);
  }
  render() {
    //console.log('this.props.completeGoals', this.props.completeGoals)
    return (
      <div>
        {
          this.props.completeGoals.map((completeGoal, index) => {
            const { title, email, serverKey } = completeGoal;
            return (
            <div style={{margin: '5px'}} key={index}>
              <strong >{title}</strong> completed by <em>{email}</em>
              <button
                style={{marginLeft: '5px'}} className='btn btn-warning btn-sm'
                onClick={() => this.clearOne(serverKey)}
                >Clear</button>
            </div>
          )
          })
        }
        <button className='btn btn-warning'
          onClick={() => this.clearCompleted()}>
          Clear All
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { completeGoals } = state;
  return {
    completeGoals
  }
}

export default connect(mapStateToProps, { setCompleted })(CompleteGoalList);
