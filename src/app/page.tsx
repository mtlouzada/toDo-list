"use client";

import React, { useState, useEffect } from 'react';
import './globals.css';

const BASE_URL = 'http://localhost:3015/api/';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  
  const fetchTodos = async () => {
    try {
      const response = await fetch(`${BASE_URL}/alltask`);
      const data: Todo[] = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };
  
  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim()) {
      try {
        const response = await fetch(`${BASE_URL}/newtask`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: newTodo }),
        });
        const newTask: Todo = await response.json();
        setTodos([...todos, newTask]);
        setNewTodo('');
      } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
      }
    }
  };

  const updateTodo = async (id: number, title: string, completed: boolean) => {
    try {
      await fetch(`${BASE_URL}/updatetask${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, completed: !completed }),
      });
      fetchTodos();
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await fetch(`${BASE_URL}/deletetask${id}`, {
        method: 'DELETE',
      });
      fetchTodos();
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  return (
    <div></div>
  );
};

export default TodoList;