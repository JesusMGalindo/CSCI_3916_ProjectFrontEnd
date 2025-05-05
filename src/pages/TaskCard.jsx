import { Draggable } from 'react-beautiful-dnd';
import { apiFetch } from '../api';

export default function TaskCard({ task, index, reload }) {
  const toggle = () =>
    apiFetch(`/tasks/${task._id}`, {
      method:'PUT',
      body: JSON.stringify({ isCompleted: !task.isCompleted })
    }).then(reload);

  const remove = () =>
    apiFetch(`/tasks/${task._id}`, { method:'DELETE' }).then(reload);

  return (
    <Draggable draggableId={task._id} index={index}>
      {prov=>(
        <div className="task" ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}>
          <h4>{task.title}</h4>
          <p>{task.priority} priority</p>
          <div className="actions">
            <input type="checkbox" checked={task.isCompleted} onChange={toggle}/>
            <button onClick={remove}>✕</button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
