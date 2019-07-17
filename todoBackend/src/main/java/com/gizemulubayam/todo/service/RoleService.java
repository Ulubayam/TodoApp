package com.gizemulubayam.todo.service;

import com.gizemulubayam.todo.entity.Role;
import com.gizemulubayam.todo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public void save(String roleName) {
        roleRepository.save(new Role(roleName));
    }

}