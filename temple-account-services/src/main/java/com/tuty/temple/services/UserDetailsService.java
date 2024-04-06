package com.tuty.temple.services;

import com.tuty.temple.entities.User;
import com.tuty.temple.filter.UserDetailsSearchFilter;

import java.util.List;

public interface UserDetailsService {

    List<User> retrieveUserDetails();
    User fetchById(Long userId);
    User saveUser(User user);
    void deleteUser(Long userId);
    List<User> searchUser(UserDetailsSearchFilter userDetailsSearchFilter);

}
