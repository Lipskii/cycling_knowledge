package com.example.cycling_knowledge.controller;

import com.example.cycling_knowledge.entity.Race;
import com.example.cycling_knowledge.entity.Stage;
import com.example.cycling_knowledge.service.RaceService;
import com.example.cycling_knowledge.service.StageService;
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
@RequestMapping("/api/stages")
@org.springframework.web.bind.annotation.RestController
public class StageController {

    private final StageService stageService;

    @Autowired
    public StageController(StageService stageService) {
        this.stageService = stageService;
    }

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<Stage> get(
            @And({
                    @Spec(path = "id", params = "id", spec = Equal.class),
                    @Spec(path = "number", params = "number", spec = Equal.class),
                    @Spec(path = "race.category.id", params = "categoryId", spec = Equal.class),
                    @Spec(path = "race.country.id", params = "countryId", spec = Equal.class),
                    @Spec(path = "race.id", params="raceId", spec=Equal.class),
                    @Spec(path = "season.id", params="seasonId", spec=Equal.class),
            }) Specification<Stage> spec) {
        return stageService.get(spec, Sort.by("number"));
    }

    @PostMapping("")
    public Stage add(@RequestBody Stage stage) {
        System.out.println(stage);
        stageService.save(stage);
        return stage;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) { ;
        System.out.println(id);
        stageService.deleteById(id);
    }

    @PutMapping("/{id}")
    public Stage update(@PathVariable("id") int id, @RequestBody Stage stage){
        return stageService.update(id,stage);

    }
}
