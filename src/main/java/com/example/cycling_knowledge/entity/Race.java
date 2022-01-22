package com.example.cycling_knowledge.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "race")
public class Race {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idrace")
    private int id;

    @NotNull
    @Column(name = "name")
    private String name;

    @JsonIgnoreProperties(value = "organisation", allowSetters = true)
    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "organisation_idorganisation")
    private Organisation organisation;

    @NotNull
    @JsonIgnoreProperties(value = "category", allowSetters = true)
    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "category_idcategory")
    private Category category;

    @NotNull
    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "country_idcountry")
    private Country country;

    @JsonIgnoreProperties(value = "race", allowSetters = true)
    @OrderBy("number")
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "race") //, cascade = {CascadeType.PERSIST,CascadeType.REMOVE}
    private List<Stage> stages;

    public Race() {
    }

    public Race(@NotNull String name, @NotNull Category category, @NotNull Country country) {
        this.name = name;
        this.category = category;
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

    public Organisation getOrganisation() {
        return organisation;
    }

    public void setOrganisation(Organisation organisation) {
        this.organisation = organisation;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public List<Stage> getStages() {
        return stages;
    }

    public void setStages(List<Stage> stages) {
        this.stages = stages;
    }

    @Override
    public String toString() {
        return "Race{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", organisation=" + organisation +
                ", category=" + category +
                '}';
    }
}
