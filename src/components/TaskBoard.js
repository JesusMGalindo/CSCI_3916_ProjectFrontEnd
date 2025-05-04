// src/components/TaskBoard.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { fetchTasks, toggleComplete, setTask } from '../actions/taskActions';
import TaskCard from './TaskCard';
import { Link } from 'react-router-dom';

export default function TaskBoard() {
  const dispatch = useDispatch();
  const tasks = useSelector((s) => s.tasks.list);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const todo = tasks.filter((t) => !t.isCompleted);
  const done = tasks.filter((t) => t.isCompleted);

  const onDragEnd = (res) => {
    const { source, destination } = res;
    if (!destination || source.droppableId === destination.droppableId) return;
    const moved = (source.droppableId === 'todo' ? todo : done)[source.index];
    dispatch(toggleComplete(moved._id, destination.droppableId === 'done'));
  };

  return (
    <main className="task-board">
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h2>My Tasks</h2>
        <Link to="/overdue" className="btn btn-outline-danger">Overdue</Link>
      </header>
      <DragDropContext onDragEnd={onDragEnd}>
        {['todo','done'].map((col) => (
          <Droppable key={col} droppableId={col}>
            {(prov) => (
              <section ref={prov.innerRef} {...prov.droppableProps}>
                <h3>{col==='todo'?'To Do':'Done'}</h3>
                {(col==='todo'?todo:done).map((task, idx) => (
                  <TaskCard key={task._id} task={task} index={idx} onSelect={() => dispatch(setTask(task))}/>
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
