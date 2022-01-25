package com.example.cycling_knowledge.repository;

import com.example.cycling_knowledge.entity.Race;
import com.example.cycling_knowledge.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ResultRepository extends JpaRepository<Result,Integer>, JpaSpecificationExecutor<Result> {
}
