package com.tuty.temple.services.impl;

import com.tuty.temple.entities.Member;
import com.tuty.temple.filter.MemberDetailsSearchFilter;
import com.tuty.temple.repositories.MemberDetailsRepository;
import com.tuty.temple.services.MemberDetailsService;
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


import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RestController
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/v1")
public class MemberDetailsServiceImpl implements MemberDetailsService {

    @Autowired
    MemberDetailsRepository memberDetailsRepository;

    @Autowired
    ExportReportService exportReportService;

    @Override
    @GetMapping("/members")
    public List<Member> retrieveMemberDetails() {
        return memberDetailsRepository.findAll();
    }

    @Override
    @GetMapping("/member")
    public Member fetchById(@RequestParam(value="memberId") Long memberId) {
        return memberDetailsRepository.findById(memberId).orElse(null);
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
        return memberDetailsRepository.save(member);
    }
    @Override
    @DeleteMapping(value = "/member/delete")
    public void deleteMember(@RequestParam(value="memberId") Long memberId){
        memberDetailsRepository.deleteById(memberId);
    }

    @Override
    @GetMapping("/member/search")
    public List<Member> searchMember(@ParameterObject MemberDetailsSearchFilter memberDetailsSearchFilter) {
        return memberDetailsRepository.findAll(memberDetailsSearchFilter.toSpecification());
    }

    @Override
    @GetMapping("/member/export")
    public ResponseEntity<byte[]> exportMemberDetails(HttpServletResponse response) {
        // Define the file name
        String fileName = "exported_data.csv";
        try{

        List<Member> members = memberDetailsRepository.findAll();
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
