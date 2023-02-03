import React, { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { store } from './app/store';
import { selectTodos, getTodosAsync } from './todosSlice'

function TodoApp() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);
  const todoStatus = useAppSelector(state => state.todos.status);
  const textRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoStatus === 'idle') {
      dispatch(getTodosAsync)
    }
  }, [todoStatus, dispatch]);

  return (
    <div className="App">
      <div className='todos'>
        {todos?.map((todo) => (
          <React.Fragment key={todo.id}>
            <div>
              <input 
                type="checkbox" 
                checked={todo.done} 
                onChange={() => { }} 
              />
              <span>{todo.text}</span>
            </div>
            <button onClick={() => { }}>Delete</button>
          </React.Fragment>
        ))}
      </div>
      <div className='add'>
        <input type='text' ref={textRef} />
        <button onClick={() => { }}>Add</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  )
}

export default App;
