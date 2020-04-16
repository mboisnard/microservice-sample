package com.esgi.demo;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    public User getUser() {
        return new User("John", "Doe");
    }
}
