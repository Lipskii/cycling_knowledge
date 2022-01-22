package com.example.cycling_knowledge.service;

import com.example.cycling_knowledge.entity.Race;
import com.example.cycling_knowledge.entity.Stage;
import com.example.cycling_knowledge.repository.RaceRepository;
import com.example.cycling_knowledge.repository.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StageService implements ServiceInterface {

    private final StageRepository stageRepository;

    @Autowired
    public StageService(StageRepository stageRepository) {
        this.stageRepository = stageRepository;
    }

    @Override
    public List<?> findAll() {
        return null;
    }

    public List<Stage> get(Specification<Stage> spec, Sort sort){
        return stageRepository.findAll(spec,sort);
    }

    @Override
    public Optional<Stage> findById(int id) {
        return stageRepository.findById(id);
    }

    @Override
    public Stage save(Object obj) {
        return stageRepository.save((Stage) obj);
    }

    @Override
    public void deleteById(int id) {
        stageRepository.deleteById(id);
    }

    public Stage update(int id, Stage stage) {
        if (stageRepository.findById(id).isPresent()) {
            stage.setId(id);
            stageRepository.save(stage);
        } else {
            throw new ResourceNotFoundException("No stage found for id: " + id);
        }

        return stage;
    }
}
