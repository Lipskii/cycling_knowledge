package com.example.cycling_knowledge.repository;

import com.example.cycling_knowledge.entity.Race;
import com.example.cycling_knowledge.entity.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface StageRepository extends JpaRepository<Stage,Integer>, JpaSpecificationExecutor<Stage> {
}
