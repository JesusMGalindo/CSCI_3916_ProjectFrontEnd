// src/App.js
import './App.css';
import { Provider } from 'react-redux';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import store from './stores/store';
import Authentication from './components/authentication';
import TaskBoard from './components/TaskBoard';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <Routes>
            {/* Public auth routes */}
            <Route path="/signin/*" element={<Authentication />} />
            <Route path="/signup/*" element={<Authentication />} />

            {/* Main board */}
            <Route path="/" element={<TaskBoard />} />

            {/* Catch-all → signin */}
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
