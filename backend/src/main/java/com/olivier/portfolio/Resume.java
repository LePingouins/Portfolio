package com.olivier.portfolio;

import jakarta.persistence.*;

@Entity
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fileName;
    private String fileUrl;
    private String language;

    public Resume() {}
    public Resume(String fileName, String fileUrl, String language) {
        this.fileName = fileName;
        this.fileUrl = fileUrl;
        this.language = language;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }
    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }
    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
}
