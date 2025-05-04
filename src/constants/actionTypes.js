// src/constants/actionTypes.js
const Constants = {
    /* Auth */
    USER_LOGGEDIN: 'USER_LOGGEDIN',
    USER_LOGOUT:   'USER_LOGOUT',
  
    /* Task CRUD */
    FETCH_TASKS:   'FETCH_TASKS',    // list
    FETCH_TASK:    'FETCH_TASK',     // single
    SET_TASK:      'SET_TASK',       // select in UI
    ADD_TASK:      'ADD_TASK',
    UPDATE_TASK:   'UPDATE_TASK',
    DELETE_TASK:   'DELETE_TASK',
  
    /* Overdue */
    FETCH_OVERDUE: 'FETCH_OVERDUE'
  };
  
  export default Constants;
  