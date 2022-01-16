package com.example.cycling_knowledge.service;

import com.example.cycling_knowledge.entity.Cyclist;
import com.example.cycling_knowledge.repository.CyclistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CyclistService implements ServiceInterface {

    private final CyclistRepository cyclistRepository;

    @Autowired
    public CyclistService(CyclistRepository cyclistRepository) {
        this.cyclistRepository = cyclistRepository;
    }

    @Override
    public List<?> findAll() {
        return null;
    }

    public List<Cyclist> get(Specification<Cyclist> spec, Sort sort) {
        return cyclistRepository.findAll(spec, sort);
    }


    @Override
    public Object findById(int id) {
        return null;
    }

    @Override
    public Cyclist save(Object obj) {
        return cyclistRepository.save((Cyclist) obj);
    }

    @Override
    public void deleteById(int id) {

    }
}


