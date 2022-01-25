package com.example.cycling_knowledge.service;

import com.example.cycling_knowledge.entity.Cyclist;
import com.example.cycling_knowledge.entity.TeamCyclistSeason;
import com.example.cycling_knowledge.repository.CyclistRepository;
import com.example.cycling_knowledge.repository.TeamCyclistSeasonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CyclistService implements ServiceInterface {

    private final CyclistRepository cyclistRepository;
    private final TeamCyclistSeasonRepository teamCyclistSeasonRepository;

    @Autowired
    public CyclistService(CyclistRepository cyclistRepository, TeamCyclistSeasonRepository teamCyclistSeasonRepository) {
        this.cyclistRepository = cyclistRepository;
        this.teamCyclistSeasonRepository = teamCyclistSeasonRepository;
    }


    @Override
    public List<?> findAll() {
        return null;
    }

    public List<Cyclist> get(Specification<Cyclist> spec, Sort sort) {
        return cyclistRepository.findAll(spec, sort);
    }


    @Override
    public Object findById(int id) {
        return null;
    }

    @Override
    public Cyclist save(Object obj) {
        return cyclistRepository.save((Cyclist) obj);
    }

    @Override
    public void deleteById(int id) {
       cyclistRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("cyclist does not exist!"));
        cyclistRepository.deleteById(id);
        System.out.println( cyclistRepository.findById(id).isPresent());
    }

    public TeamCyclistSeason addTeamSeason(TeamCyclistSeason teamCyclistSeason){
        return teamCyclistSeasonRepository.save(teamCyclistSeason);
    }


    public void deleteTeamCyclistSeason(int id) {
        teamCyclistSeasonRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(" does not exist!"));
        teamCyclistSeasonRepository.deleteById(id);
        System.out.println( teamCyclistSeasonRepository.findById(id).isPresent());
    }

    public Cyclist updateCyclist(int id, Cyclist cyclist) {
        if (cyclistRepository.findById(id).isPresent()) {
            cyclist.setId(id);
            cyclistRepository.save(cyclist);
        } else {
            throw new ResourceNotFoundException("No cyclist found for id: " + id);
        }

        return cyclist;
    }


}


