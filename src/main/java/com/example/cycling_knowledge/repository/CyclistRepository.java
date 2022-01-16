package com.example.cycling_knowledge.repository;

import com.example.cycling_knowledge.entity.Cyclist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CyclistRepository  extends JpaRepository<Cyclist,Integer>, JpaSpecificationExecutor<Cyclist> {
}
