package com.app.blog.models;

public class BlogResponse {
    private blog blog;
    private String name;
    private String gender;


    public void setBlog(blog blog) {
        this.blog = blog;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public blog getBlog() {
        return blog;
    }

    public String getName() {
        return name;
    }

    public String getGender() {
        return gender;
    }

    public BlogResponse() {
    }

    public BlogResponse(blog blog, String name, String gender) {
        this.blog = blog;
        this.name = name;
        this.gender = gender;
    }
}
