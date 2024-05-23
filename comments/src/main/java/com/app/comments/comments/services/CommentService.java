package com.app.comments.comments.services;

import com.app.comments.comments.models.Comment;

import com.app.comments.comments.models.userSent;
import com.app.comments.comments.repositories.CommentRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    private CommentRepository commentrepository;
    @Autowired

    public CommentService(CommentRepository commentrepository) {
        this.commentrepository = commentrepository;
    }

    public List<Comment> getComments(Long blogId){
        return commentrepository.findCommentByBlogId(blogId);
    }

    public void addComment(Comment comment){
        commentrepository.save(comment)   ; }
    public List<Comment> getAll(){
         return this.commentrepository.findAll();
    }

    @KafkaListener(topics = "user_topic", groupId = "comments-group")
    public void listen(userSent user) {
        // Traitement des détails de l'utilisateur
        System.out.println("Received User: " + user);
    }

    }



