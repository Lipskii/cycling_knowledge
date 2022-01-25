package com.example.cycling_knowledge.service;

import com.example.cycling_knowledge.entity.Result;
import com.example.cycling_knowledge.entity.Stage;
import com.example.cycling_knowledge.repository.ResultRepository;
import com.example.cycling_knowledge.repository.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResultService implements ServiceInterface {

    private final ResultRepository resultRepository;

    @Autowired
    public ResultService(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }

    @Override
    public List<?> findAll() {
        return null;
    }

    public List<Result> get(Specification<Result> spec, Sort sort){
        return resultRepository.findAll(spec,sort);
    }

    @Override
    public Optional<Result> findById(int id) {
        return resultRepository.findById(id);
    }

    @Override
    public Result save(Object obj) {
        return resultRepository.save((Result) obj);
    }

    @Override
    public void deleteById(int id) {
        resultRepository.deleteById(id);
    }

    public Result update(int id, Result result) {
        if (resultRepository.findById(id).isPresent()) {
            result.setId(id);
            resultRepository.save(result);
        } else {
            throw new ResourceNotFoundException("No result found for id: " + id);
        }

        return result;
    }
}
