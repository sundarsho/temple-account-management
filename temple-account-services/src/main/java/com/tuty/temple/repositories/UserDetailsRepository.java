package com.tuty.temple.repositories;

import com.tuty.temple.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface UserDetailsRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

}
