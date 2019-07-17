package com.gizemulubayam.todo.controller;

import com.gizemulubayam.todo.entity.TodoItem;
import com.gizemulubayam.todo.service.TodoItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
public class TodoItemController {

    @Autowired
    private TodoItemService todoItemService;


    @PostMapping("todo-items")
    public TodoItem create(@RequestBody TodoItem todoItem, @RequestParam("todoListId") Long todoListId) {
      return todoItemService.create(todoItem, todoListId);
    }


    @PatchMapping("todo-items/{todoItemId}")
    public TodoItem markAsComplete(@PathVariable("todoItemId") Long todoItemId) {
        return todoItemService.markAsComplete(todoItemId);
    }

    @DeleteMapping("todo-items/{todoItemId}")
    public void delete(@PathVariable("todoItemId") Long todoItemId) {
        todoItemService.delete(todoItemId);

    }
}
