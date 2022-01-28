package com.example.cycling_knowledge.service;

import com.example.cycling_knowledge.entity.Country;
import com.example.cycling_knowledge.entity.Gender;
import com.example.cycling_knowledge.entity.Team;
import com.example.cycling_knowledge.entity.TeamCyclistSeason;
import com.example.cycling_knowledge.repository.GenderRepository;
import com.example.cycling_knowledge.repository.TeamCyclistSeasonRepository;
import com.example.cycling_knowledge.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService implements ServiceInterface {

    private final TeamRepository teamRepository;
    private final TeamCyclistSeasonRepository teamCyclistSeasonRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository, TeamCyclistSeasonRepository teamCyclistSeasonRepository) {
        this.teamRepository = teamRepository;
        this.teamCyclistSeasonRepository = teamCyclistSeasonRepository;
    }

    @Override
    public List<?> findAll() {
        return null;
    }

    public List<Team> get(Specification<Team> spec, Sort sort){
        return teamRepository.findAll(spec,sort);
    }

    public List<TeamCyclistSeason> getTeamCyclistSeason(Specification<TeamCyclistSeason> spec, Sort sort){
        return teamCyclistSeasonRepository.findAll(spec,sort);
    }

    @Override
    public Optional<Team> findById(int id) {
        return teamRepository.findById(id);
    }

    @Override
    public Team save(Object obj) {
        return teamRepository.save((Team) obj);
    }

    @Override
    public void deleteById(int id) {
        teamRepository.deleteById(id);
    }

    public Team updateTeam(int teamId, Team team) {
        if (teamRepository.findById(teamId).isPresent()) {
            team.setId(teamId);
            teamRepository.save(team);
        } else {
            throw new ResourceNotFoundException("No team found for id: " + teamId);
        }

        return team;
    }
}
