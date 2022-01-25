package com.example.cycling_knowledge.repository;

import com.example.cycling_knowledge.entity.Season;
import com.example.cycling_knowledge.entity.TeamCyclistSeason;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamCyclistSeasonRepository extends JpaRepository<TeamCyclistSeason,Integer>  {
}
