package com.gizemulubayam.todo.service;

import com.gizemulubayam.todo.entity.TodoList;
import com.gizemulubayam.todo.repository.TodoListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gizemulubayam.todo.entity.User;

import java.util.List;

@Service
public class TodoListService {

    @Autowired
    private TodoListRepository todoListRepository;

    public TodoList save(TodoList todoList, User user) {

        todoList.setUser(user);

        return todoListRepository.save(todoList);
    }
    public List<TodoList> list(User user) {
        return todoListRepository.findAllByUser(user);
    }

    public void delete(Long todoListId) {
        todoListRepository.deleteById(todoListId);

    }
}
