package com.example.cycling_knowledge.controller;


import com.example.cycling_knowledge.entity.Cyclist;
import com.example.cycling_knowledge.entity.TeamCyclistSeason;
import com.example.cycling_knowledge.service.CyclistService;
import net.kaczmarzyk.spring.data.jpa.domain.Between;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.EqualIgnoreCase;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/api/cyclists")
@org.springframework.web.bind.annotation.RestController
public class CyclistController {

    private final CyclistService cyclistService;


    @Autowired
    public CyclistController(CyclistService cyclistService) {
        this.cyclistService = cyclistService;
    }


    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<Cyclist> getCyclist(
            @And({
                    @Spec(path = "id", params = "id", spec = Equal.class),
                    @Spec(path = "person.id", params = "personId", spec = Equal.class),
                    @Spec(path = "isActive", params = "isActive", spec = Equal.class),
                    @Spec(path = "uciCode", params = "uciCode", spec = Equal.class),
                    @Spec(path = "person.country.id", params = "countryId", spec = Equal.class),
                    @Spec(path = "person.city.id", params = "cityId", spec = Equal.class),
                    @Spec(path = "person.gender.id", params = "genderId", spec = Equal.class),
                    @Spec(path = "person.lastName", params = "lastNameLike=", spec = EqualIgnoreCase.class),
                    @Spec(path = "teamCyclistSeason.team.id", params="teamId", spec = Equal.class),
                    @Spec(path = "teamCyclistSeason.season.season", params="season", spec = Equal.class),
                    @Spec(path="person.birthdate", params={"bornAfter","bornBefore"}, spec= Between.class),
                    @Spec(path="person.birthdate", params="bornOn", spec=Equal.class)
            }) Specification<Cyclist> spec) {
        return cyclistService.get(spec, Sort.by("person.lastName"));
    }

    @PostMapping("")
    public Cyclist addCyclist(@RequestBody Cyclist cyclist) {
        cyclistService.save(cyclist);
        return cyclist;
    }

    @PostMapping("/teamSeason")
    public TeamCyclistSeason addTeamSeason(@RequestBody TeamCyclistSeason teamCyclistSeason) {
        cyclistService.addTeamSeason(teamCyclistSeason);
        return teamCyclistSeason;
    }

    @DeleteMapping("/teamSeason/{id}")
    public void deleteTeamSeason(@PathVariable("id") int id) {
        cyclistService.deleteTeamCyclistSeason(id);
    }

    @DeleteMapping("/{cyclistId}")
    public void delete(@PathVariable("cyclistId") int cyclistId) {
        cyclistService.deleteById(cyclistId);
    }

    @PutMapping(value = "/{cyclistId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public Cyclist update(@RequestBody Cyclist c, @PathVariable("cyclistId") int cyclistId) {
        return cyclistService.updateCyclist(cyclistId,c);

    }

}
