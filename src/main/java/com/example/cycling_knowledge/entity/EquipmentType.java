package com.example.cycling_knowledge.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "equipment_type")
public class EquipmentType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idequipment_type")
    private int id;

    @Column(name = "type")
    private String type;

//    @JsonIgnoreProperties(value = "equipment_type", allowSetters = true)
//    @OneToMany(fetch = FetchType.EAGER, mappedBy = "equipment_type", cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
//    private List<Equipment> equipmentList;

    public EquipmentType() {
    }

    public EquipmentType(String type) {
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

//    public List<Equipment> getEquipmentList() {
//        return equipmentList;
//    }
//
//    public void setEquipmentList(List<Equipment> equipmentList) {
//        this.equipmentList = equipmentList;
//    }

    @Override
    public String toString() {
        return "EquipmentType{" +
                "id=" + id +
                ", type='" + type + '\'' +
             //   ", equipmentList=" + equipmentList +
                '}';
    }
}
