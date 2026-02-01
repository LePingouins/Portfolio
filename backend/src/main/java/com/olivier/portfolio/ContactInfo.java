package com.olivier.portfolio;

import jakarta.persistence.*;

@Entity
public class ContactInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String phone;
    private String address;
    private String linkedin;
    private String github;
    private String website;

    public ContactInfo() {}
    public ContactInfo(String email, String phone, String address, String linkedin, String github, String website) {
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.linkedin = linkedin;
        this.github = github;
        this.website = website;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getLinkedin() { return linkedin; }
    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }
    public String getGithub() { return github; }
    public void setGithub(String github) { this.github = github; }
    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }
}
