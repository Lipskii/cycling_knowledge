package com.example.cycling_knowledge.controller;

import com.example.cycling_knowledge.entity.Result;
import com.example.cycling_knowledge.entity.Team;
import com.example.cycling_knowledge.service.ResultService;
import com.example.cycling_knowledge.service.TeamService;
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
@RequestMapping("/api/results")
@org.springframework.web.bind.annotation.RestController
public class ResultController {

    private final ResultService resultService;

    @Autowired
    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<Result> get(
            @And({
                    @Spec(path = "id", params = "id", spec = Equal.class),
                    @Spec(path = "rank", params = "rank", spec = Equal.class),
                    @Spec(path = "stage.season.id", params = "seasonId", spec = Equal.class),
                    @Spec(path = "stage.race.id", params = "raceId", spec = Equal.class),
                    @Spec(path = "stage.id", params = "stageId", spec = Equal.class),
            }) Specification<Result> spec) {
        return resultService.get(spec, Sort.by("rank"));
    }

    @PostMapping("")
    public Result add(@RequestBody Result result) {
        System.out.println(result);
        resultService.save(result);
        return result;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        System.out.println("delete");
        System.out.println(id);
        resultService.deleteById(id);
    }

    @PutMapping("/{id}")
    public Result update(@PathVariable("id") int id, @RequestBody Result result){
        return resultService.update(id,result);

    }
}
