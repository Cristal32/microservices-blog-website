package com.app.user.models;

public class CommentAddedEvent {
    private String eventType = "CommentAdded";
    private String commentId;
    private String blogId;
    private String userId;
    private String userName;
    private String date;
    private String content;
    private String profile;

    // Constructeur, getters et setters

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getCommentId() {
        return commentId;
    }

    public void setCommentId(String commentId) {
        this.commentId = commentId;
    }

    public String getBlogId() {
        return blogId;
    }

    public void setBlogId(String blogId) {
        this.blogId = blogId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public CommentAddedEvent(String eventType, String commentId, String blogId, String userId, String userName) {
        this.eventType = eventType;
        this.commentId = commentId;
        this.blogId = blogId;
        this.userId = userId;
        this.userName = userName;
        this.date = date;
        this.content = content;
        this.profile = profile;
    }
}
