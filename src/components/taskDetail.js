import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTask } from '../actions/taskActions';

export default function TaskDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const task = useSelector((s) => s.tasks.selected);

  useEffect(() => { dispatch(fetchTask(id)); }, [id, dispatch]);

  if (!task) return <div>Loading…</div>;
  return (
    <div className="p-4">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      {task.dueDate && <p>Due on: {new Date(task.dueDate).toLocaleDateString()}</p>}
    </div>
  );
}
