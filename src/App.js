// src/App.js
import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import store from './stores/store';

import Authentication from './components/authentication';
import TaskBoard      from './components/TaskBoard';
import TaskDetail     from './components/taskDetail';
import OverdueList    from './components/overdue';
import CatchAll       from './components/CatchAll';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <Routes>
            {/* public: signin/signup */}
            <Route path="/signin/*" element={<Authentication />} />
            <Route path="/signup/*" element={<Authentication />} />

            {/* protected */}
            <Route path="/"          element={<PrivateRoute><TaskBoard /></PrivateRoute>} />
            <Route path="/tasks"     element={<PrivateRoute><TaskBoard /></PrivateRoute>} />
            <Route path="/tasks/:id" element={<PrivateRoute><TaskDetail /></PrivateRoute>} />
            <Route path="/overdue"   element={<PrivateRoute><OverdueList /></PrivateRoute>} />

            {/* everything else */}
            <Route path="*" element={<CatchAll />} />
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
