package com.app.comments.comments.repositories;

import com.app.comments.comments.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository  extends JpaRepository<Comment,Long> {
    public List<Comment> findCommentByBlogId(Long blogId);


}
