package com.example.cycling_knowledge.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "gender")
public class Gender {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idgender")
    private int id;

    @Column(name = "gender")
    private String gender;

    @JsonIgnoreProperties(value = "gender", allowSetters = true)
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "gender", cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private List<Person> people;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public List<Person> getPeople() {
        return people;
    }

    public void setPeople(List<Person> people) {
        this.people = people;
    }

    @Override
    public String toString() {
        return "Gender{" +
                "id=" + id +
                ", gender='" + gender + '\'' +
                '}';
    }
}
