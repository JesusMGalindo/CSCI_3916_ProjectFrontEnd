// src/components/overdue.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOverdue } from '../actions/taskActions';
import TaskCard from './TaskCard';

export default function OverdueList() {
  const dispatch = useDispatch();
  const overdue = useSelector((s) => s.tasks.overdue);

  useEffect(() => {
    dispatch(fetchOverdue());
  }, [dispatch]);

  if (!overdue.length) return <div className="p-4">No overdue tasks 🎉</div>;
  return (
    <div className="p-4">
      <h2>Overdue Tasks</h2>
      {overdue.map((task, i) => (
        <TaskCard key={task._id} task={task} index={i} />
      ))}
    </div>
  );
}
