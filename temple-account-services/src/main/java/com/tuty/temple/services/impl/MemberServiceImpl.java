package com.tuty.temple.services.impl;

import com.tuty.temple.entities.Member;
import com.tuty.temple.filter.MemberSearchFilter;
import com.tuty.temple.repositories.MemberRepository;
import com.tuty.temple.services.MemberService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RestController
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/v1")
public class MemberServiceImpl implements MemberService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    ExportReportService exportReportService;

    @Override
    @GetMapping("/members")
    public List<Member> retrieveMemberDetails() {
        return memberRepository.findAll();
    }

    @Override
    @GetMapping("/member")
    public Member fetchById(@RequestParam(value="memberId") Long memberId) {
        return memberRepository.findById(memberId).orElse(null);
    }

    @Override
    @PostMapping(value = "/member/save")
    public Member saveMember(@RequestBody Member member) {
        if(member.getMemberId()!=null){
            member.setUpdatedBy("admin");
            member.setUpdatedDt(LocalDateTime.now());
        }else{
            member.setCreatedBy("admin");
            member.setCreatedDt(LocalDateTime.now());
        }
        return memberRepository.save(member);
    }
    @Override
    @DeleteMapping(value = "/member/delete")
    public void deleteMember(@RequestParam(value="memberId") Long memberId){
        memberRepository.deleteById(memberId);
    }

    @Override
    @GetMapping("/member/search")
    public List<Member> searchMember(@ParameterObject MemberSearchFilter memberSearchFilter) {
        return memberRepository.findAll(memberSearchFilter.toSpecification());
    }

    @Override
    @GetMapping("/member/export")
    public ResponseEntity<byte[]> exportMemberDetails(HttpServletResponse response) {
        // Define the file name
        String fileName = "export_member_data.csv";
        try{

        List<Member> members = memberRepository.findAll();
        // Export data to CSV
        byte[] byteArray = exportReportService.exportToCSV(fileName, members, Member.class);


        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", fileName);

        // Return the exported file as a byte array
        return new ResponseEntity<>(byteArray, headers, HttpStatus.OK);
    } catch(IOException e) {
        // Handle export errors
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

}


}
