package com.example.cycling_knowledge.repository;

import com.example.cycling_knowledge.entity.Season;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeasonRepository extends JpaRepository<Season,Integer> {
    List<Season> findAllByOrderBySeasonDesc();
}
