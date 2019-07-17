package com.gizemulubayam.todo.repository;

import com.gizemulubayam.todo.entity.TodoList;
import org.springframework.data.jpa.repository.JpaRepository;
import com.gizemulubayam.todo.entity.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoListRepository extends JpaRepository<TodoList, Long> {

    List<TodoList> findAllByUser(User user);
}
