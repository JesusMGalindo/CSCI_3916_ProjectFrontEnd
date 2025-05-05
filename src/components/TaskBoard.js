import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { fetchTasks, toggleComplete, setTask } from '../actions/taskActions';
import TaskCard from './TaskCard';
import AddTaskModal from './addTaskModal';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function TaskBoard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((s) => s.tasks.list);

  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const todo = tasks.filter((t) => !t.isCompleted);
  const done = tasks.filter((t) => t.isCompleted);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination || source.droppableId === destination.droppableId) return;
    const moved =
      source.droppableId === 'todo' ? todo[source.index] : done[source.index];
    const shouldComplete = destination.droppableId === 'done';
    dispatch(toggleComplete(moved._id, shouldComplete));
  };

  return (
    <main className="task-board">
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h2>My Tasks</h2>
        <div>
          <Button
            variant="success"
            className="me-2"
            onClick={() => setShowAdd(true)}
          >
            + Add Task
          </Button>
          <Button variant="outline-danger" onClick={() => navigate('/overdue')}>
            Overdue
          </Button>
        </div>
      </header>

      {/* Add Task Modal */}
      <AddTaskModal show={showAdd} handleClose={() => setShowAdd(false)} />

      <DragDropContext onDragEnd={onDragEnd}>
        {['todo', 'done'].map((col) => (
          <Droppable key={col} droppableId={col}>
            {(provided) => (
              <section
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={col === 'todo' ? 'todo-column' : 'done-column'}
              >
                <h3>{col === 'todo' ? 'To Do' : 'Done'}</h3>
                {(col === 'todo' ? todo : done).map((task, idx) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    index={idx}
                    onSelect={() => {
                      dispatch(setTask(task));
                      navigate(`/tasks/${task._id}`);
                    }}
                  />
                ))}
                {provided.placeholder}
              </section>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </main>
  );
}
