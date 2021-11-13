package com.example.cycling_knowledge.service;

import com.example.cycling_knowledge.entity.Country;
import com.example.cycling_knowledge.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryService implements ServiceInterface{

    private final CountryRepository countryRepository;

    @Autowired
    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @Override
    public List<Country> findAll() {
        return countryRepository.findAll();
    }

    public List<Country> get(Specification<Country> spec, Sort sort){
        return countryRepository.findAll(spec,sort);
    }

    @Override
    public Optional<Country> findById(int id) {
        return countryRepository.findById(id);
    }

    @Override
    public Country save(Object obj) {
        return countryRepository.save((Country) obj);
    }

    @Override
    public void deleteById(int id) {
        countryRepository.deleteById(id);
    }

}
