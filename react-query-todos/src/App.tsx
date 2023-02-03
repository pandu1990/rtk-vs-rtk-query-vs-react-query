import React, { useRef } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getTodos, updateTodo, deleteTodo, createTodo } from './lib/api-axios';

const queryClient = new QueryClient();

function TodoApp() {

  const { data: todos } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    initialData: []
  });
  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  });
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  });
  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  });

  const textRef = useRef<HTMLInputElement>(null);

  return (
    <div className="App">
      <div className='todos'>
        {todos?.map((todo) => (
          <React.Fragment key={todo.id}>
            <div>
              <input 
                type="checkbox" 
                checked={todo.done} 
                onChange={() => { 
                  updateMutation.mutate({ ...todo, done: !todo.done })
                }} 
              />
              <span>{todo.text}</span>
            </div>
            <button onClick={() => { 
              deleteMutation.mutate(todo)
            }}>Delete</button>
          </React.Fragment>
        ))}
      </div>
      <div className='add'>
        <input type='text' ref={textRef} />
        <button onClick={() => {
          createMutation.mutate(textRef.current!.value ?? '');
          textRef.current!.value = '';
        }}>Add</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoApp />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
