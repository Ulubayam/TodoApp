package com.gizemulubayam.todo.controller;

import com.gizemulubayam.todo.entity.TodoList;
import com.gizemulubayam.todo.entity.User;
import com.gizemulubayam.todo.service.TodoListService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TodoListController {

    @Autowired
    private TodoListService todoListService;

    @PostMapping("todo-lists")
    public TodoList create(@RequestBody TodoList todoList, @AuthenticationPrincipal User user) {
        return todoListService.save(todoList, user);
    }

    @GetMapping("todo-lists")
    public List<TodoList> list(@AuthenticationPrincipal User user) {
        return todoListService.list(user);
    }

    @DeleteMapping("todo-lists/{todoListId}")
    public void delete(@PathVariable("todoListId") Long todoListId) {
        todoListService.delete(todoListId);

    }

}
