package com.example.cycling_knowledge.repository;

import com.example.cycling_knowledge.entity.Country;
import com.example.cycling_knowledge.entity.Season;
import com.example.cycling_knowledge.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TeamRepository extends JpaRepository<Team,Integer>, JpaSpecificationExecutor<Team> {

}
