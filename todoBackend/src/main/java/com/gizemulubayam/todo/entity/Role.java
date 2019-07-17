package com.gizemulubayam.todo.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Role implements GrantedAuthority {

    @Id
    private String roleName = "ROLE_USER"; //security handle by prefix, role prefix mandatory

    @Override
    public String getAuthority() {
        return roleName;
    }
}