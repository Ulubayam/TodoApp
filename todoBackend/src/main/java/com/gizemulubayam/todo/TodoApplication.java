package com.gizemulubayam.todo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.gizemulubayam.todo.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;



@SpringBootApplication
public class TodoApplication implements CommandLineRunner {

    @Autowired
    private RoleService roleService;
    public static void main(String[] args) {


        SpringApplication.run(TodoApplication.class, args);

    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }


    /**
     * ROLE SEEDER METHOD
     */
    @Override
    public void run(String... args) {

        roleService.save("ROLE_USER");

    }

}
