package com.example.cycling_knowledge.repository;


import com.example.cycling_knowledge.entity.ERole;
import com.example.cycling_knowledge.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Integer> {
    Optional<Role> findByName(ERole name);
}
