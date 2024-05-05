package com.app.user.controllers;

import com.app.user.models.user;
import com.app.user.services.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.Map;
@CrossOrigin
@RestController

@RequestMapping(path ="/users")
public class userController {
    private userService userservice;
    @Autowired
    public userController(userService userservice) {
        this.userservice = userservice;

    }

    @PostMapping("/add")

    public user addUser(@RequestBody Map<String, Object> requestBody) throws NoSuchAlgorithmException {
        String name = (String) requestBody.get("name");
        String email = (String) requestBody.get("email");
        String address = (String) requestBody.get("adresse");
        String phone = (String) requestBody.get("phone");
        String password = (String) requestBody.get("password");
        String gender = (String) requestBody.get("gender");

        user newUser = new user(name, email, address, phone, password, gender);
        return userservice.addUser(newUser);


    }

    @GetMapping(path="/authentifier/{email}/{password}")
    public user authentifier(@PathVariable("email") String email , @PathVariable("password") String pass){

        return userservice.authentifier(email,pass);
    }


    //get profile
    @GetMapping(path ="/profile/{Id}")
    public user getProfile(@PathVariable("Id")Long id ){
        user u=userservice.getProfile(id);
        return u;
    }
//edit profile
//modifier ses informations personnelles

    @PutMapping("/edit/{Id}")

    public user editUser(@PathVariable("Id")Long id , @RequestBody Map<String,Object> requestBody) {


        System.out.println(id);
        String name =(String)requestBody.get("name");
        System.out.println(name);
        String email = (String) requestBody.get("email");
        String address = (String) requestBody.get("adresse");
        String phone = (String) requestBody.get("phone");
        String password = (String) requestBody.get("password");
        String gender=(String) requestBody.get("gender");


        // Create a user object with the extracted data
        user updatedUser = new user(name, email, address, phone,password  ,gender);

        // Call the editUser method of the UserService
      return  userservice.editUser( updatedUser,id);
    }

    //get usr by id

    @GetMapping("/getuser/{userId}")
    public user usergetUserById(@PathVariable Long userId) {
      return userservice.getUserById(userId);
    }
}
