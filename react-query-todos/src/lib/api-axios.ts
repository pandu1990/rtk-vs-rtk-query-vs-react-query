import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:4000/todos'
});

export interface Todo {
  id: number;
  text: string;
  active: boolean;
  done: boolean;
}

export const getTodos = async (): Promise<Todo[]> => 
  (await axiosClient.get<Todo[]>('/')).data;

export const getTodo = async (id: number): Promise<Todo> => 
  (await axiosClient.get<Todo>(`/${id}`)).data;

export const createTodo = async (text: string): Promise<Todo> =>
  (await axiosClient.post<Todo>('/', { text })).data;

export const updateTodo = async (todo: Todo): Promise<Todo> =>
  (await axiosClient.put<Todo>(`/${todo.id}`, todo)).data

export const deleteTodo = async (todo: Todo): Promise<Todo> =>
  axiosClient.delete(`/${todo.id}`).then(() => todo);
