package com.example.ComeAndSee.Model;

public class Participant {
    String name;
    String invitedBy;
    String gender;
    String phoneNumber;

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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Participant(String name, String invitedBy, String gender, String phoneNumber) {
        this.name = name;
        this.invitedBy = invitedBy;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
    }

    public Participant() {}

}
