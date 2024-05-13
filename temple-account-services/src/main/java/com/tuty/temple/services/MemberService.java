package com.tuty.temple.services;

import com.tuty.temple.entities.Member;
import com.tuty.temple.filter.MemberSearchFilter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MemberService {

    List<Member> retrieveMemberDetails();
    Member fetchById(Long memberId);
    Member saveMember(Member member);
    void deleteMember(Long memberId);
    List<Member> searchMember(MemberSearchFilter memberSearchFilter);
    ResponseEntity<byte[]> exportMemberDetails(HttpServletResponse response);
    ResponseEntity<byte[]> searchMemberExport(MemberSearchFilter memberSearchFilter, HttpServletResponse response);


}
