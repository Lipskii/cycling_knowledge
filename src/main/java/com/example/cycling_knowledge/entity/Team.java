package com.example.cycling_knowledge.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "team")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idteam")
    private int id;

    @NotNull
    @Column(name = "name")
    private String name;

    @Column(name = "code")
    private String code;

    @Column(name = "division")
    private int division;

//    @JsonIgnoreProperties(value ="teamList", allowSetters = true)
    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "country_idcountry")
    private Country country;

    public Team() {
    }

    public Team(@NotNull String name, String code, int division, Country country) {
        this.name = name;
        this.code = code;
        this.division = division;
        this.country = country;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public int getDivision() {
        return division;
    }

    public void setDivision(int division) {
        this.division = division;
    }

    @Override
    public String toString() {
        return "Team{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", code='" + code + '\'' +
                ", division=" + division +
                ", country=" + country +
                '}';
    }
}
