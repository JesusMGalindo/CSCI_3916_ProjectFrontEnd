// src/components/TaskBoard.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { fetchTasks, toggleComplete } from '../actions/taskActions';
import TaskCard from './TaskCard';

export default function TaskBoard() {
  const dispatch = useDispatch();
  const tasks = useSelector((s) => s.tasks.list);

  useEffect(() => { dispatch(fetchTasks()); }, [dispatch]);

  // Split by completion
  const todo   = tasks.filter(t => !t.isCompleted);
  const done   = tasks.filter(t =>  t.isCompleted);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { droppableId: fromCol } = result.source;
    const { droppableId: toCol }   = result.destination;
    if (fromCol !== toCol) {
      const moved = (fromCol === 'todo' ? todo : done)[result.source.index];
      dispatch(toggleComplete(moved._id, toCol === 'done'));
    }
  };

  return (
    <main className="task-board">
      <h2>My Tasks</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        {['todo','done'].map((col) => (
          <Droppable key={col} droppableId={col}>
            {(prov) => (
              <section ref={prov.innerRef} {...prov.droppableProps}>
                <h3>{col === 'todo' ? 'To Do' : 'Done'}</h3>
                {(col === 'todo' ? todo : done).map((task, idx) => (
                  <TaskCard key={task._id} task={task} index={idx} />
                ))}
                {prov.placeholder}
              </section>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </main>
  );
}
