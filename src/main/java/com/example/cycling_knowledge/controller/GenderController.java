package com.example.cycling_knowledge.controller;

import com.example.cycling_knowledge.entity.Gender;
import com.example.cycling_knowledge.service.GenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/api/genders")
@org.springframework.web.bind.annotation.RestController
public class GenderController {

    private final GenderService genderService;


    @Autowired
    public GenderController(GenderService genderService) {
        this.genderService = genderService;
    }


    @GetMapping("")
    public List<Gender> getGenders() {
        return genderService.findAll();
    }

}