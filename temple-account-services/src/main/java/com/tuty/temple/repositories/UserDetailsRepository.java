package com.tuty.temple.repositories;

import com.tuty.temple.entities.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

public interface UserDetailsRepository extends JpaRepository<UserDetails, Long> {

}
