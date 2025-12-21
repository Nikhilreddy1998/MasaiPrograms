import { useDispatch } from 'react-redux';
import { deleteTodo } from '../redux/tasksSlice';

function TodoItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <li style={{ marginBottom: '10px' }}>
      <span>{todo.text}</span>
      <button
        onClick={() => dispatch(deleteTodo(todo.id))}
        style={{ marginLeft: '10px', padding: '2px 8px', color: 'red' }}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;