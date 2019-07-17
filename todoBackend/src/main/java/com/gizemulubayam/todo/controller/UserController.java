package com.gizemulubayam.todo.controller;

import com.gizemulubayam.todo.config.JsonWebTokenGenerator;
import com.gizemulubayam.todo.dto.JsonWebTokenResponse;
import com.gizemulubayam.todo.entity.User;
import com.gizemulubayam.todo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private JsonWebTokenGenerator jsonWebTokenGenerator;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("login")
    public JsonWebTokenResponse login(@RequestParam("email") String email,
                                      @RequestParam("password") String password) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jsonWebToken = jsonWebTokenGenerator.generateToken(authentication);

        return new JsonWebTokenResponse(jsonWebToken);
    }


    @PostMapping("register")
    public User create(@RequestBody User user) {
        return userService.saveUser(user);
    }
}
