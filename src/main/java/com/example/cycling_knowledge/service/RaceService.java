package com.example.cycling_knowledge.service;

import com.example.cycling_knowledge.entity.Race;
import com.example.cycling_knowledge.entity.Team;
import com.example.cycling_knowledge.repository.RaceRepository;
import com.example.cycling_knowledge.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RaceService implements ServiceInterface {

    private final RaceRepository raceRepository;

    @Autowired
    public RaceService(RaceRepository raceRepository) {
        this.raceRepository = raceRepository;
    }

    @Override
    public List<?> findAll() {
        return null;
    }

    public List<Race> get(Specification<Race> spec, Sort sort){
        return raceRepository.findAll(spec,sort);
    }

    @Override
    public Optional<Race> findById(int id) {
        return raceRepository.findById(id);
    }

    @Override
    public Race save(Object obj) {
        return raceRepository.save((Race) obj);
    }

    @Override
    public void deleteById(int id) {
        raceRepository.deleteById(id);
    }

    public Race updateRace(int id, Race race) {
        if (raceRepository.findById(id).isPresent()) {
            race.setId(id);
            raceRepository.save(race);
        } else {
            throw new ResourceNotFoundException("No race found for id: " + id);
        }

        return race;
    }
}
