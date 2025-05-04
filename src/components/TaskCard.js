// src/components/TaskCard.js
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function TaskCard({ task, index, onSelect }) {
  const due = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : null;
  return (
    <Draggable draggableId={task._id} index={index}>
      {(prov) => (
        <Link to={`/tasks/${task._id}`} style={{ textDecoration:'none' }}>
          <Card
            ref={prov.innerRef}
            {...prov.draggableProps}
            {...prov.dragHandleProps}
            className="task-card mb-2"
            onClick={onSelect}
          >
            <Card.Body>
              <Card.Title>
                {task.title}{' '}
                <Badge bg={
                  task.priority==='high'   ? 'danger'  :
                  task.priority==='medium' ? 'warning' :
                                             'secondary'
                }>
                  {task.priority}
                </Badge>
              </Card.Title>
              {due && <Card.Subtitle className="mb-1 text-muted">Due: {due}</Card.Subtitle>}
              {task.description && <Card.Text>{task.description}</Card.Text>}
            </Card.Body>
          </Card>
        </Link>
      )}
    </Draggable>
  );
}
