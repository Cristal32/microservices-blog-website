package com.app.blog.controllers;

import com.app.blog.models.BlogResponse;
import com.app.blog.models.blog;
import com.app.blog.services.blogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController

@RequestMapping(path = "/blogs")
public class blogController {
private blogService blogservice;

    @Autowired
    public blogController( blogService blogservice) {
        this.blogservice = blogservice;
    }


//ajouter un blog

    @PostMapping("/addBlog/{id}")
    public void addBlog(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("country") String country,
            @RequestParam("imageFile") MultipartFile imageFile,
            @RequestParam("date") String date,
            @PathVariable("id") Long userId
    ) throws IOException {
        // Traitement des données FormData ici
        // Vous pouvez accéder aux champs title et description directement comme des paramètres de méthode
        // L'image est accessible via le paramètre imageFile de type MultipartFile
        blogservice.addBlog(title,country, description, imageFile.getBytes(),date, userId);
    }
    //get blogs
    @GetMapping("/user/{userId}")
    public List<blog> getBlogsByUserId(@PathVariable Long userId) {
        List<blog> blogs = blogservice.getBlogsByUserId(userId);


        return blogs;
    }
// gets blog by country
    @GetMapping("/country/{country}")
    public List<BlogResponse> getBlogsByCountry(@PathVariable String country) {
        return blogservice.getBlogsByCountry(country);
    }
//all
    @GetMapping("/all")
    public List<BlogResponse> getAllBlogs() {
        return blogservice.getAllBlogs();
    }
//blog by id
    @GetMapping("/content/{blogid}")
    public blog  getBlogById(@PathVariable Long blogid) {
        return  blogservice.getBlogById(blogid);

    }
}
