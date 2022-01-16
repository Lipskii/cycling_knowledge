package com.example.cycling_knowledge.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "team_equipment")
public class TeamEquipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idteam_equipment")
    private int id;

    @NotNull
    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "team_idteam")
    private Team team;



}
