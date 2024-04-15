package com.tuty.temple.services;

import com.tuty.temple.entities.Member;
import com.tuty.temple.filter.MemberDetailsSearchFilter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MemberDetailsService {

    List<Member> retrieveMemberDetails();
    Member fetchById(Long memberId);
    Member saveMember(Member member);
    void deleteMember(Long memberId);
    List<Member> searchMember(MemberDetailsSearchFilter memberDetailsSearchFilter);

    ResponseEntity<byte[]> exportMemberDetails(HttpServletResponse response);



}
