import { useState } from 'react';
import { apiFetch } from '../api';

export default function NewTaskModal({ close }) {
  const [form, set] = useState({ title:'', description:'', priority:'medium', dueDate:'' });

  const submit = e => {
    e.preventDefault();
    apiFetch('/tasks', { method:'POST', body:JSON.stringify(form) })
      .then(close);
  };

  return (
    <div className="modal">
      <form onSubmit={submit} className="card">
        <h3>New Task</h3>
        <input placeholder="title" required onChange={e=>set({...form,title:e.target.value})}/>
        <textarea placeholder="description" onChange={e=>set({...form,description:e.target.value})}/>
        <select onChange={e=>set({...form,priority:e.target.value})}>
          <option value="low">low</option><option value="medium">medium</option><option value="high">high</option>
        </select>
        <input type="date" onChange={e=>set({...form,dueDate:e.target.value})}/>
        <button>Create</button>
        <button type="button" onClick={close}>Cancel</button>
      </form>
    </div>
  );
}
