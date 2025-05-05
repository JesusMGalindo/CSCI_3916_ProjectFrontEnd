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

  const load = () => apiFetch('/tasks').then(setTasks);

  useEffect(load, []);

  const columns = ['todo','doing','done','overdue'];

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;
    const task = tasks.find(t => t._id === source.draggableId);
    if (task.status === destination.droppableId) return;

    apiFetch(`/tasks/${task._id}`, {
      method:'PUT',
      body: JSON.stringify({ status: destination.droppableId })
    }).then(load);
  };

  return (
    <>
      <header>
        <h1>My Tasks</h1>
        <button onClick={()=>setShowNew(true)}>+ Task</button>
        <button onClick={logout}>log out</button>
      </header>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {columns.map(col=>(
            <Column key={col}
              id={col}
              title={col.toUpperCase()}
              tasks={tasks.filter(t=>t.status===col)}
              reload={load}/>
          ))}
        </div>
      </DragDropContext>

      {showNew && <NewTaskModal close={()=>{setShowNew(false);load();}} />}
    </>
  );
}