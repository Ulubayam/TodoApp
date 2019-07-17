package com.gizemulubayam.todo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TodoList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long id;
    private String name;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "todoList", fetch = FetchType.EAGER, orphanRemoval = true)
    private List<TodoItem> todoItems;

}
