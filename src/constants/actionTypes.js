// src/constants/actionTypes.js
const Constants = {
    /* Auth */
    USER_LOGGEDIN: 'USER_LOGGEDIN',
    USER_LOGOUT:   'USER_LOGOUT',
  
    /* Task CRUD */
    FETCH_TASKS:  'FETCH_TASKS',   // list all tasks
    FETCH_TASK:   'FETCH_TASK',    // fetch one by id (unused yet)
    SET_TASK:     'SET_TASK',      // set selected task in UI
    ADD_TASK:     'ADD_TASK',
    UPDATE_TASK:  'UPDATE_TASK',
    DELETE_TASK:  'DELETE_TASK'
  };
  
  export default Constants;
  