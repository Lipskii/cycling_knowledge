package com.example.cycling_knowledge.service;

import com.example.cycling_knowledge.entity.Season;
import com.example.cycling_knowledge.repository.SeasonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SeasonService implements ServiceInterface {

    private final SeasonRepository seasonRepository;

    @Autowired
    public SeasonService(SeasonRepository seasonRepository) {
        this.seasonRepository = seasonRepository;
    }

    @Override
    public List<Season> findAll() {
        return seasonRepository.findAllByOrderBySeasonDesc();
    }

    @Override
    public Optional<Season> findById(int id) {
        return seasonRepository.findById(id);
    }

    @Override
    public Season save(Object obj) {
        return seasonRepository.save((Season) obj);
    }

    @Override
    public void deleteById(int id) {
        seasonRepository.deleteById(id);
    }
}
