"use client";

import React, { useState, useEffect } from 'react';
import { Box, Flex, Input, Button, List, ListItem, Checkbox, Heading } from "@chakra-ui/react";


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
    <Flex direction="column" align="center" p={4} maxW="md" mx="auto">
      <Heading as="h1" size="lg" textAlign="center" mb={4}>
        To-Do List
      </Heading>
      <Flex direction={{ base: "column", md: "row" }} gap={4} w="100%">
        <Input
          placeholder="Nova tarefa"
          size="md"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button colorScheme="blue" onClick={addTodo}>
          Adicionar
        </Button>
      </Flex>
      <List spacing={3} mt={4} w="100%">
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            bg="gray.50"
            rounded="md"
            shadow="sm"
          >
            <Checkbox
              isChecked={todo.completed}
              onChange={() => updateTodo(todo.id, todo.title, todo.completed)}
            >
              {todo.title}
            </Checkbox>
            <Button size="sm" colorScheme="red" onClick={() => deleteTodo(todo.id)}>
              Excluir
            </Button>
          </ListItem>
        ))}
      </List>
    </Flex>
    
  );
};

export default TodoList;