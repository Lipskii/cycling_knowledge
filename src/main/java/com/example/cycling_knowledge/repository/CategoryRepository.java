package com.example.cycling_knowledge.repository;

import com.example.cycling_knowledge.entity.Category;
import com.example.cycling_knowledge.entity.Race;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CategoryRepository extends JpaRepository<Category,Integer>, JpaSpecificationExecutor<Category> {
}
