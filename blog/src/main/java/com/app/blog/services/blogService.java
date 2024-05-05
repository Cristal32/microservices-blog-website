package com.app.blog.services;

import com.app.blog.models.BlogResponse;
import com.app.blog.models.blog;
import com.app.blog.models.user;
import com.app.blog.repositories.blogRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.List;

@Service
public class blogService {

    private blogRepository blogrepository;
    private UserServiceClient userServiceClient;

@Autowired
    public blogService(blogRepository blogrepository, UserServiceClient userServiceClient) {
        this.blogrepository = blogrepository;
        this.userServiceClient = userServiceClient;
    }


//ajouter un blog
    public void addBlog(
            String title,String country,String description,byte[] image,String date ,Long userId

    ) {

        try {
            // Fetch the user by user id (assuming you have a UserRepository)

            blog b =new blog(title,country,description,image,date,userId);
            blogrepository.save(b);
        } catch (Exception e) {
            // Handle any other exceptions that might occur
            e.printStackTrace();

        }
    }
    //get Blog by id
    public blog getBlogById(Long id) {


        return blogrepository.findById(id).orElse(null);


    }

//liste de blog par utilisateur
    public List<blog> getBlogsByUserId(Long userId) {
        List<blog> listOfBlogd=blogrepository.findByUserId(userId);


        return listOfBlogd;
    }
    //par country
    public List<BlogResponse> getBlogsByCountry(String country) {
        List<blog> blogs = blogrepository.findByCountry(country);
        List<BlogResponse> blogResponses = new ArrayList<>();
        for (blog blog : blogs) {
            BlogResponse blogResponse = new BlogResponse();
            blogResponse.setBlog(blog);
            user user = userServiceClient.getUserById(blog.getUser());
            if (user != null) {
                blogResponse.setName(user.getName());
                blogResponse.setGender(user.getGender());
            }
            blogResponses.add(blogResponse);
        }
        return blogResponses;
    }
    //all
    public List<BlogResponse> getAllBlogs( ) {
        List<blog> blogs = blogrepository.findAll();
        List<BlogResponse> blogResponses = new ArrayList<>();
        for (blog blog : blogs) {
            BlogResponse blogResponse = new BlogResponse();
            blogResponse.setBlog(blog);
            user user = userServiceClient.getUserById(blog.getUser());
            if (user != null) {
                blogResponse.setName(user.getName());
                blogResponse.setGender(user.getGender());
            }
            blogResponses.add(blogResponse);
        }
        return blogResponses;
    }


}

