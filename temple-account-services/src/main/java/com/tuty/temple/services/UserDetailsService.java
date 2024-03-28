package com.tuty.temple.services;

import com.tuty.temple.entities.UserDetails;

import java.util.List;

public interface UserDetailsService {

    List<UserDetails> retrieveUserDetails();
    UserDetails fetchById(Long userId);

    UserDetails saveUser(UserDetails userDetails);

}
