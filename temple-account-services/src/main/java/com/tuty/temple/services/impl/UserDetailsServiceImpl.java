package com.tuty.temple.services.impl;

import com.tuty.temple.entities.UserDetails;
import com.tuty.temple.repositories.UserDetailsRepository;
import com.tuty.temple.services.UserDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Service
@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/v1")
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserDetailsRepository userDetailsRepository;

    @Override
    @GetMapping("/users")
    public List<UserDetails> retrieveUserDetails() {
        return userDetailsRepository.findAll();
    }

    @Override
    @GetMapping("/{userId}")
    public UserDetails fetchById(Long userId) {
        return userDetailsRepository.findById(userId).orElse(null);
    }

    @Override
    @PostMapping("/saveUser")
    public UserDetails saveUser(UserDetails userDetails) {
        return userDetailsRepository.save(userDetails);
    }
}
