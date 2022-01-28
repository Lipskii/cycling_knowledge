package com.example.cycling_knowledge.repository;

import com.example.cycling_knowledge.entity.Season;
import com.example.cycling_knowledge.entity.Team;
import com.example.cycling_knowledge.entity.TeamCyclistSeason;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TeamCyclistSeasonRepository extends JpaRepository<TeamCyclistSeason,Integer>, JpaSpecificationExecutor<TeamCyclistSeason> {
}
