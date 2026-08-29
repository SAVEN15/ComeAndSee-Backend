package com.example.ComeAndSee.Model;

import jakarta.persistence.*;

import java.time.OffsetDateTime;

@Entity
@Table(name = "\"ComeAndSee\"")
public class CASModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "invited_by")
    private String invitedBy;

    @Column(name = "gender")
    private String gender;

    @Column(name = "created_date")
    private OffsetDateTime createdDate;

    @Column(name = "modified_date")
    private OffsetDateTime modifiedDate;

    @Column(name = "phone_number")
    private String phoneNumber;

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInvitedBy() {
        return invitedBy;
    }

    public void setInvitedBy(String invitedBy) {
        this.invitedBy = invitedBy;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public OffsetDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(OffsetDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public OffsetDateTime getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(OffsetDateTime modified_date) {
        this.modifiedDate = modified_date;
    }
    public CASModel(){

    }


    public CASModel(Long id, String name, String invitedBy, String gender, OffsetDateTime createdDate, OffsetDateTime modified_date, String phoneNumber) {
        this.id = id;
        this.name = name;
        this.invitedBy = invitedBy;
        this.gender = gender;
        this.createdDate = createdDate;
        this.modifiedDate = modified_date;
        this.phoneNumber = phoneNumber;
    }
}