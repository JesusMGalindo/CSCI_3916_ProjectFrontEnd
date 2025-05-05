import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { apiFetch } from '../api';
import Column from '../components/Column';
import NewTaskModal from '../components/NewTaskModal';
import { useAuth } from '../context/authProvider';

export default function Board() {
  const [tasks, setTasks] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const { logout } = useAuth();

  // ── fetch tasks from API
  const load = () => apiFetch('/tasks').then(setTasks);
  useEffect(load, []);

  const columns = ['todo', 'doing', 'done', 'overdue'];

  // ── handle drag‑and‑drop
  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;

    const task = tasks.find(t => t._id === source.draggableId);
    if (!task || task.status === destination.droppableId) return;

    // 1️⃣ optimistic UI update
    setTasks(prev =>
      prev.map(t =>
        t._id === task._id ? { ...t, status: destination.droppableId } : t
      )
    );

    // 2️⃣ persist change to the server
    apiFetch(`/tasks/${task._id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: destination.droppableId })
    }).catch(() => load()); // fallback to reload on error
  };

  return (
    <>
      <header>
        <h1>My Tasks</h1>
        <button onClick={() => setShowNew(true)}>+ Task</button>
        <button onClick={logout}>log out</button>
      </header>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {columns.map(col => (
            <Column
              key={col}
              id={col}
              title={col.toUpperCase()}
              tasks={tasks.filter(t => t.status === col)}
              reload={load}
            />
          ))}
        </div>
      </DragDropContext>

      {showNew && <NewTaskModal close={() => { setShowNew(false); load(); }} />}
    </>
  );
}
