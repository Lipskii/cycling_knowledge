package com.example.cycling_knowledge.controller;

import com.example.cycling_knowledge.entity.Season;
import com.example.cycling_knowledge.service.SeasonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/api/seasons")
@org.springframework.web.bind.annotation.RestController
public class SeasonController {

    private final SeasonService seasonService;

    @Autowired
    public SeasonController(SeasonService seasonService) {
        this.seasonService = seasonService;
    }

    @GetMapping("")
    public List<Season> getSeasons() {
        return seasonService.findAll();
    }


}
