package com.example.cycling_knowledge.repository;

import com.example.cycling_knowledge.entity.Cyclist;
import com.example.cycling_knowledge.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PersonRepository extends JpaRepository<Person,Integer>, JpaSpecificationExecutor<Person> {
}
