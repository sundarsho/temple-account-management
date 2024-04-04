package com.tuty.temple.entities;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;

@Data
@Builder(toBuilder = true, builderClassName = "Builder")
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "USER_DETAILS")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="USER_ID")
    private Long userId;

    @Column(name="NAME")
    private String name;

    @Column(name="FATHER_NAME")
    private String fatherName;

    @Column(name="STREET_ADDRESS1")
    private String streetAddress1;

    @Column(name="STREET_ADDRESS2")
    private String streetAddress2;

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

    @Column(name="NOTES", columnDefinition = "TEXT")
    private String notes;

}
