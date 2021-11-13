package com.example.cycling_knowledge.service;

import java.util.List;


public interface ServiceInterface {

    List<?> findAll();

    //List<> get(Specification<T> spec, Sort sort);

    Object findById(int id);

    <T> T save(T obj);

    void deleteById(int id);

}
