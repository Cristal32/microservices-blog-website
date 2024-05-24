package com.app.user.repositories;



import com.app.user.models.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface userRepository extends JpaRepository<user,Long> {
    public user findUserByUserId(Long id);
    public user findUserByEmail(String email);
    public user getUserByUserId(Long UserId);



}
