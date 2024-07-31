package com.tuty.temple.entities;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder(toBuilder = true, builderClassName = "Builder")
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "MEMBER")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "member_generator")
    @SequenceGenerator(name = "member_generator", sequenceName = "MEMBER_ID_SEQ", allocationSize = 1)
    @Column(name="MEMBER_ID")
    private Long memberId;

    @Column(name="NAME")
    private String name;

    @Column(name="FATHER_NAME")
    private String fatherName;

    @Column(name="GENDER")
    private String gender;

    @Column(name="STREET_ADDRESS1")
    private String streetAddress1;

    @Column(name="STREET_ADDRESS2")
    private String streetAddress2;

    @Column(name="STREET_ADDRESS3")
    private String streetAddress3;

    @Column(name="CITY")
    private String city;

    @Column(name="STATE")
    private String state;

    @Column(name="ZIP_CODE")
    private String zipCode;

    @Column(name="ANCESTOR_VILLAGE")
    private String ancestorVillage;

    @Column(name="PHONE")
    private String phone;

    @Column(name="WHATSAPP")
    private String whatsApp;

    @Column(name="EMAIL_ID")
    private String emailId;

    @Column(name="STATUS")
    private String status;

    @Lob
    @Column(name="NOTES")
    private String notes;

    @Column(name="CREATED_DT")
    private LocalDateTime createdDt;

    @Column(name="CREATED_BY")
    private String createdBy;

    @Column(name="UPDATED_DT")
    private LocalDateTime updatedDt;

    @Column(name="UPDATED_BY")
    private String updatedBy;
}
