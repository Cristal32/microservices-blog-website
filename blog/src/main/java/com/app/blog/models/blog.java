package com.app.blog.models;

import jakarta.persistence.*;

import org.hibernate.annotations.Type;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
@Entity
@Table

public class blog{

    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO)
    private Long blogId;

    private String title;


    private String description;
    private String country;

    private byte[] image;


    private Long userId;

    private String date;


    public blog() {
    }





    public blog(String title, String country, String description, byte[] image,String date,Long userId) {
        this.title = title;
        this.country = country;
        this.description = description;
        this.image = image;
        this.date=date;
        this.userId = userId;
    }



    public Long getBlogId() {
        return blogId;
    }

    public void setBlogId(Long blogId) {
        this.blogId = blogId;
    }

    public Long getUser() {
        return userId;
    }

    public void setUser(Long userId) {
        this.userId = userId;
    }

    public Long getBlog() {
        return blogId;
    }

    public void setBlog(Long blog) {
        this.blogId = blog;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }

}
