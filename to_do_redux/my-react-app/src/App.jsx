
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {
  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', textAlign: 'center' }}>
      <h1>To-Do List</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default App;