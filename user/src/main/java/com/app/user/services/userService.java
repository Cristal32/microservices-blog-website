package com.app.user.services;



import com.app.user.Hash1;
import com.app.user.models.CommentAddedEvent;
import com.app.user.models.user;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.app.user.repositories.userRepository;

import java.security.NoSuchAlgorithmException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class userService {
    private userRepository userrepository ;
     private Hash1 hash=new Hash1();


    @Autowired
    public userService(userRepository userrepository) {
        this.userrepository = userrepository;

    }







        //add user
        public user addUser(user u) throws NoSuchAlgorithmException {
            String password= u.getPassword();
            String hashedPassword = String.valueOf(hash.hashString(password));
            u.setPassword(hashedPassword);
           return  userrepository.save(u);
        }

        //verifierLogin
        public user authentifier(String email, String pass) {
            user u = userrepository.findUserByEmail(email);
            System.out.println(u.getUserId());
            try {
                pass = String.valueOf(hash.hashString(pass));
                if (pass.equals(u.getPassword()))

                    return u;
            }catch (NoSuchAlgorithmException ee) { ee.printStackTrace(); }

            return null;



        }


        //getProfile
        public user getProfile(Long id) {
            user u = userrepository.findUserByUserId(id);
            return u;
        }

        //edit profile
        //modifier ses informations personnelles
@Transactional
        public user editUser(user updatedUserData, Long id) {
            user existingUser = userrepository.findById(id)
                    .orElseThrow(() -> new IllegalStateException("user not found with id: " + updatedUserData.getUserId()));

            // Update the existing user's properties with the provided updatedUserData
            existingUser.setName(updatedUserData.getName());
            existingUser.setEmail(updatedUserData.getEmail());
            existingUser.setAdresse(updatedUserData.getAdresse());
            existingUser.setPhone(updatedUserData.getPhone());
            existingUser.setPassword(updatedUserData.getPassword());
            existingUser.setGender(updatedUserData.getGender()); // Corrected line

            // Save the updated user to the database
          return userrepository.save(existingUser);
        }

        //get user
        public user getUserById(Long userId) {
            return userrepository.getUserByUserId(userId);
        }

    }
