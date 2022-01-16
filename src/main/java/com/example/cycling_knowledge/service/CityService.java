package com.example.cycling_knowledge.service;

import com.example.cycling_knowledge.entity.City;
import com.example.cycling_knowledge.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityService implements ServiceInterface {

    private final CityRepository cityRepository;

    @Autowired
    public CityService(CityRepository cityRepository){
        this.cityRepository = cityRepository;
    }

    @Override
    public List<City> findAll() {
        return cityRepository.findAll();
    }

    public List<City> get(Specification<City> spec, Sort sort) {
        return cityRepository.findAll(spec, sort);
    }

    @Override
    public Optional<City> findById(int id) {
        return cityRepository.findById(id);
    }

    @Override
    public City save(Object obj) {
        return cityRepository.save((City) obj);
    }

    @Override
    public void deleteById(int id) {
        cityRepository.deleteById(id);
    }

}
