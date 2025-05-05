import { Droppable } from 'react-beautiful-dnd';
import TaskCard from '../pages/TaskCard';

export default function Column({ id, title, tasks, reload }) {
  return (
    <Droppable droppableId={id}>
      {prov=>(
        <div className="column" ref={prov.innerRef} {...prov.droppableProps}>
          <h3>{title}</h3>
          {tasks.map((t,i)=><TaskCard key={t._id} task={t} index={i} reload={reload} />)}
          {prov.placeholder}
        </div>
      )}
    </Droppable>
  );
}
