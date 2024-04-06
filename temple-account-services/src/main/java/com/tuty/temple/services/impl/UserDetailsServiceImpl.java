package com.tuty.temple.services.impl;

import com.tuty.temple.entities.User;
import com.tuty.temple.filter.UserDetailsSearchFilter;
import com.tuty.temple.repositories.UserDetailsRepository;
import com.tuty.temple.services.UserDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@Service
@RestController
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/v1")
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserDetailsRepository userDetailsRepository;

    @Override
    @GetMapping("/users")
    public List<User> retrieveUserDetails() {
        return userDetailsRepository.findAll();
    }

    @Override
    @GetMapping("/user")
    public User fetchById(@RequestParam(value="userId") Long userId) {
        return userDetailsRepository.findById(userId).orElse(null);
    }

    @Override
    @PostMapping(value = "/user/save")
    public User saveUser( @RequestBody User user) {
        return userDetailsRepository.save(user);
    }

    @Override
    @DeleteMapping(value = "/user/delete")
    public void deleteUser(@RequestParam(value="userId") Long userId){
        userDetailsRepository.deleteById(userId);
    }

    @Override
    @GetMapping("/user/search")
    public List<User> searchUser(@ParameterObject UserDetailsSearchFilter userDetailsSearchFilter) {
        return userDetailsRepository.findAll(userDetailsSearchFilter.toSpecification());
    }


}
