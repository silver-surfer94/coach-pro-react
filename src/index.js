import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { firebaseApp } from './firebase';
import { Provider } from 'react-redux';
import { createStore }  from 'redux';
import reducer from './reducers';
import { logUser } from './actions';


import App from './components/App';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

const store = createStore(reducer);
const history = createBrowserHistory();

firebaseApp.auth().onAuthStateChanged(user => {
  if (user) {
    //console.log('user has signed in or up', user);
    const { email } = user;
    //console.log('user', user)
    store.dispatch(logUser(email));
    history.push('/app');
  } else {
    //console.log('user has signed out or still needs to sign in');
    history.replace('/signin')
  }
})

ReactDOM.render (
  <Provider store={store}>
    <Router path="/" history={history}>
      <div>
        <Route path="/app" component={App} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </div>
    </Router>
  </Provider>,

    document.getElementById('root')
)
