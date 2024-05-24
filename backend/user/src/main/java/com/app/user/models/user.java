package com.app.user.models;





import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;




@CrossOrigin


@Entity
@Table(name="usertable")
public class user {


    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO)
    private Long userId;

    private String name;

    private String email;
    private String adresse;
    private String phone;
    private String password;
    private String gender;

    public user() {
    }

    public user(String name, String email, String adresse, String phone, String password, String gender) {

        this.name = name;
        this.email = email;
        this.adresse = adresse;
        this.phone = phone;
        this.password = password;
        this.gender = gender;
    }

    public user(Long userId, String name, String email, String adresse, String phone, String gender) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.adresse = adresse;
        this.phone = phone;

        this.gender = gender;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}