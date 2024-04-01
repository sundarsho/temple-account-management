package com.tuty.temple.repositories;

import com.tuty.temple.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailsRepository extends JpaRepository<User, Long> {

}
