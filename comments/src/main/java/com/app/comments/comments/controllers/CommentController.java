package com.app.comments.comments.controllers;

import com.app.comments.comments.models.Comment;
import com.app.comments.comments.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {
    private CommentService commentservice;
    @Autowired
    public CommentController(CommentService commentservice) {
        this.commentservice = commentservice;
    }



    @GetMapping("/getComments/{blogId}")
    public List<Comment> getComments(@PathVariable  Long blogId){
        return commentservice.getComments(blogId) ;   }

    @PostMapping("/addComment")
    public void addComment(@RequestBody Comment comment){
        commentservice.addComment(comment);
    }

}
