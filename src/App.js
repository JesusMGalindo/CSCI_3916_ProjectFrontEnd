// src/App.js
import './App.css';
import { Provider } from 'react-redux';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import store from './stores/store';
import Authentication from './components/authentication';
import TaskBoard from './components/TaskBoard';
import TaskDetail from './components/TaskDetail';
import OverdueList from './components/overdue';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <Routes>
            <Route path="/"            element={<TaskBoard />} />
            <Route path="/tasks"       element={<TaskBoard />} />
            <Route path="/tasks/:id"   element={<TaskDetail />} />
            <Route path="/overdue"     element={<OverdueList />} />
            <Route path="/signin/*"    element={<Authentication />} />
            <Route path="/signup/*"    element={<Authentication />} />
            <Route path="*"            element={<Navigate to="/signin" replace />} />
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
