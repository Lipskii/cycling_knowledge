package com.example.cycling_knowledge.controller;

import com.example.cycling_knowledge.entity.Race;
import com.example.cycling_knowledge.entity.Team;
import com.example.cycling_knowledge.service.RaceService;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
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
@RequestMapping("/api/races")
@org.springframework.web.bind.annotation.RestController
public class RaceController {

    private final RaceService raceService;

    @Autowired
    public RaceController(RaceService raceService) {
        this.raceService = raceService;
    }

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<Race> getRaces(
            @And({
                    @Spec(path = "id", params = "id", spec = Equal.class),
                    @Spec(path = "name", params = "name", spec = Equal.class),
                    @Spec(path = "category.id", params = "categoryId", spec = Equal.class),
                    @Spec(path = "country.id", params = "countryId", spec = Equal.class),
            }) Specification<Race> spec) {
        return raceService.get(spec, Sort.by("name"));
    }

    @PostMapping("")
    public Race addRace(@RequestBody Race race) {
        System.out.println(race);
        raceService.save(race);
        return race;
    }

    @DeleteMapping("/{id}")
    public void deleteRace(@PathVariable("id") int id) { ;
        System.out.println(id);
        raceService.deleteById(id);
    }

    @PutMapping("/{id}")
    public Race updateRace(@PathVariable("id") int id, @RequestBody Race race){
        return raceService.updateRace(id,race);

    }
}
