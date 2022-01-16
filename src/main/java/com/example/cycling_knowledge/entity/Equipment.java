package com.example.cycling_knowledge.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "equipment")
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idequipment")
    private int id;

    @Column(name = "name")
    private String name;

    @JsonIgnoreProperties(value = "equipment", allowSetters = true)
    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "equipment_type_idequipment_type")
    private EquipmentType equipmentType;

    public Equipment() {
    }

    public Equipment(String name, EquipmentType equipmentType) {
        this.name = name;
        this.equipmentType = equipmentType;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public EquipmentType getEquipmentType() {
        return equipmentType;
    }

    public void setEquipmentType(EquipmentType equipmentType) {
        this.equipmentType = equipmentType;
    }

    @Override
    public String toString() {
        return "Equipment{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", equipmentType=" + equipmentType +
                '}';
    }
}
