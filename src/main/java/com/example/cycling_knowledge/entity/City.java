package com.example.cycling_knowledge.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "city")
public class City implements Comparable<City> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idcity")
    private int id;

    @Column(name = "name")
    private String name;

    @JsonIgnoreProperties(value ="cities", allowSetters = true)
    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "country_idcountry")
    private Country country;

    @JsonIgnoreProperties(value = {"city"}, allowSetters = true)
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "city", cascade = {CascadeType.PERSIST})
    private List<Person> people;

    public City() {
    }

    public City(String name, Country country) {
        this.name = name;
        this.country = country;
    }

    public City(String name) {
        this.name = name;
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

    public List<Person> getPeople() {
        return people;
    }

    public void setPeople(List<Person> people) {
        this.people = people;
    }

    @Override
    public int compareTo(City o) {
        return this.name.compareTo(o.name);
    }

    @Override
    public String toString() {
        return "City{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", country=" + country +
                ", people=" + people +
                '}';
    }
}
