import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/tasksSlice';

function AddTodo() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task"
        style={{ padding: '5px', marginRight: '10px' }}
      />
      <button type="submit" style={{ padding: '5px 10px' }}>
        Add Task
      </button>
    </form>
  );
}

export default AddTodo;