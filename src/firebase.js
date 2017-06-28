import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCSSmt_0YttBurcBLq-RU0LzAzXsdyKb6U",
    authDomain: "goal-coach-7892d.firebaseapp.com",
    databaseURL: "https://goal-coach-7892d.firebaseio.com",
    projectId: "goal-coach-7892d",
    storageBucket: "",
    messagingSenderId: "336084173789"
};

export const firebaseApp = firebase.initializeApp(config);
export const goalRef = firebase.database().ref('goals');
export const completeGoalRef = firebase.database().ref('completeGoals');
export const existingUsersRef = firebase.database().ref('existingUsers');
