package com.example.ComeAndSee.Respository;

import com.example.ComeAndSee.Model.CASModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CASRepo extends JpaRepository<CASModel, Integer> {
    void deleteById(Long id);
    CASModel findById(Long id);
    List<CASModel> findAllByOrderByNameDesc();
}