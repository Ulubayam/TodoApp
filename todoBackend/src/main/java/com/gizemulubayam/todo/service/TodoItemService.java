package com.gizemulubayam.todo.service;

import com.gizemulubayam.todo.entity.TodoItem;
import com.gizemulubayam.todo.entity.TodoList;
import com.gizemulubayam.todo.repository.TodoItemRepository;
import com.gizemulubayam.todo.repository.TodoListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TodoItemService {

    @Autowired
    private TodoItemRepository todoItemRepository;

    @Autowired
    private TodoListRepository todoListRepository;

    public TodoItem markAsComplete(Long todoItemId) {
       Optional<TodoItem> todoItemOptional = todoItemRepository.findById(todoItemId);

       if(todoItemOptional.isPresent()) {
          TodoItem todoItem = todoItemOptional.get();
          todoItem.setStatus("Completed");

       }
       return null;
    }

    public void delete(Long todoItemId) {
        todoItemRepository.deleteById(todoItemId);
    }


    public TodoItem create(TodoItem todoItem, Long todoListId) {
        todoItem.setStatus("Not Completed");
      Optional<TodoList> todoListOptional =  todoListRepository.findById(todoListId);


       todoListOptional.ifPresent((todoList)-> todoItem.setTodoList(todoList));
       return todoItemRepository.save(todoItem);
    }

}
