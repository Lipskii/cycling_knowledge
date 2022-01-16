package com.example.cycling_knowledge.repository;

import com.example.cycling_knowledge.entity.Season;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamCyclistSeason extends JpaRepository<Season,Integer>  {
}
