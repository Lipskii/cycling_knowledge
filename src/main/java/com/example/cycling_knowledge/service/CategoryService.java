package com.example.cycling_knowledge.service;

import com.example.cycling_knowledge.entity.Category;
import com.example.cycling_knowledge.entity.Race;
import com.example.cycling_knowledge.repository.CategoryRepository;
import com.example.cycling_knowledge.repository.RaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService implements ServiceInterface {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<?> findAll() {
        return null;
    }

    public List<Category> get(Specification<Category> spec, Sort sort){
        return categoryRepository.findAll(spec,sort);
    }

    @Override
    public Optional<Category> findById(int id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Category save(Object obj) {
        return categoryRepository.save((Category) obj);
    }

    @Override
    public void deleteById(int id) {
        categoryRepository.deleteById(id);
    }

    public Category update(int id, Category category) {
        if (categoryRepository.findById(id).isPresent()) {
            category.setId(id);
            categoryRepository.save(category);
        } else {
            throw new ResourceNotFoundException("No category found for id: " + id);
        }

        return category;
    }
}
