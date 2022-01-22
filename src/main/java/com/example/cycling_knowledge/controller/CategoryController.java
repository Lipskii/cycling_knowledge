package com.example.cycling_knowledge.controller;

import com.example.cycling_knowledge.entity.Category;
import com.example.cycling_knowledge.entity.Race;
import com.example.cycling_knowledge.service.CategoryService;
import com.example.cycling_knowledge.service.RaceService;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/api/categories")
@org.springframework.web.bind.annotation.RestController
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }


    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<Category> getRaces(
            @And({
                    @Spec(path = "id", params = "id", spec = Equal.class),
                    @Spec(path = "name", params = "name", spec = Equal.class),
                    @Spec(path = "code", params = "code", spec = Equal.class),
                    @Spec(path = "division", params = "division", spec = Equal.class),
                    @Spec(path = "country.id", params = "countryId", spec = Equal.class),
            }) Specification<Category> spec) {
        return categoryService.get(spec, Sort.by("name"));
    }

    @PostMapping("")
    public Category add(@RequestBody Category category) {
        System.out.println(category);
        categoryService.save(category);
        return category;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) { ;
        System.out.println(id);
        categoryService.deleteById(id);
    }

    @PutMapping("/{id}")
    public Category update(@PathVariable("id") int id, @RequestBody Category category){
        return categoryService.update(id,category);

    }
}
