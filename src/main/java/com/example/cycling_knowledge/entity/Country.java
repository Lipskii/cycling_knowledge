package com.example.cycling_knowledge.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "country")
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idcountry")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "code")
    private String code;

    @JsonIgnoreProperties(value = "country", allowSetters = true )
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "country", cascade = {CascadeType.PERSIST})
    private List<City> cities;

    @JsonIgnoreProperties(value = "country", allowSetters = true )
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "country", cascade = {CascadeType.PERSIST})
    private List<Person> people;

    public Country() {
    }

    public Country(String name, String code) {
        this.name = name;
        this.code = code;
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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public List<City> getCities() {
        return cities;
    }

    public void setCities(List<City> cities) {
        this.cities = cities;
    }

    public List<Person> getPeople() {
        return people;
    }

    public void setPeople(List<Person> people) {
        this.people = people;
    }

    @Override
    public String toString() {
        return "Country{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", code='" + code + '\'' +
                ", cities=" + cities +
                '}';
    }
}
