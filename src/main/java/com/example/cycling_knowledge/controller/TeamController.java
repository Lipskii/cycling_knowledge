package com.example.cycling_knowledge.controller;

import com.example.cycling_knowledge.entity.Country;
import com.example.cycling_knowledge.entity.Team;
import com.example.cycling_knowledge.service.CountryService;
import com.example.cycling_knowledge.service.TeamService;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.NotNull;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Join;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/api/teams")
@org.springframework.web.bind.annotation.RestController
public class TeamController {

    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<Team> getTeams(
            @And({
                    @Spec(path = "id", params = "id", spec = Equal.class),
                    @Spec(path = "name", params = "name", spec = Equal.class),
                    @Spec(path = "code", params = "code", spec = Equal.class),
                    @Spec(path = "division", params = "division", spec = Equal.class),
                    @Spec(path = "country.id", params = "country.id", spec = Equal.class),
            }) Specification<Team> spec) {
        return teamService.get(spec, Sort.by("name"));
    }

    @PostMapping("")
    public Team addTeam(@RequestBody Team team) {
        teamService.save(team);
        return team;
    }

    @DeleteMapping("/{teamId}")
    public void deleteTeam(@PathVariable("teamId") int teamId) {
        teamService.deleteById(teamId);
    }

    @PutMapping("/{teamId}")
    public Team updateTeam(@PathVariable("teamId") int teamId, @RequestBody Team team){
        return teamService.updateTeam(teamId,team);

    }


}

