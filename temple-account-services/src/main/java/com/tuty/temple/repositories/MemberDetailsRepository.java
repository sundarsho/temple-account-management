package com.tuty.temple.repositories;

import com.tuty.temple.entities.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface MemberDetailsRepository extends JpaRepository<Member, Long>, JpaSpecificationExecutor<Member> {

}
