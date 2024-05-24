package com.app.blog.repositories;

import com.app.blog.models.blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface blogRepository extends JpaRepository<blog,Long> {
    List<blog> findByUserId(Long userId);
    List<blog> findByCountry(String country);
}
