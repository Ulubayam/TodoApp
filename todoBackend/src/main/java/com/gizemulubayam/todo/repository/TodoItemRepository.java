package com.gizemulubayam.todo.repository;

import com.gizemulubayam.todo.entity.TodoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TodoItemRepository extends JpaRepository<TodoItem, Long> {


}
