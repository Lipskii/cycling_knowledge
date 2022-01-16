package com.example.cycling_knowledge.service;

import com.example.cycling_knowledge.entity.Gender;
import com.example.cycling_knowledge.repository.GenderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GenderService {

    private final GenderRepository genderRepository;

    @Autowired
    public GenderService(GenderRepository genderRepository) {
        this.genderRepository = genderRepository;
    }

    public List<Gender> findAll() {
        return genderRepository.findAll();
    }

    public Optional<Gender> findById(int id) {
        return genderRepository.findById(id);
    }

}
