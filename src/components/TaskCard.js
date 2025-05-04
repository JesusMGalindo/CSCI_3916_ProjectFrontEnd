// src/components/TaskCard.js
import { Draggable } from 'react-beautiful-dnd';

export default function TaskCard({ task, index }) {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(prov) => (
        <div
          className="task-card"
          ref={prov.innerRef}
          {...prov.draggableProps}
          {...prov.dragHandleProps}
        >
          <h4>{task.title}</h4>
          {task.dueDate && <small>Due: {new Date(task.dueDate).toLocaleDateString()}</small>}
          <p className={`priority ${task.priority}`}>{task.priority}</p>
        </div>
      )}
    </Draggable>
  );
}
