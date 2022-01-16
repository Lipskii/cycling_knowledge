package com.example.cycling_knowledge.repository;

import com.example.cycling_knowledge.entity.Gender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenderRepository extends JpaRepository<Gender,Integer> {
}
