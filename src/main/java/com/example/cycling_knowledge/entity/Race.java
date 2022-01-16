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

    @NotNull
    @JsonIgnoreProperties(value = "organisation", allowSetters = true)
    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "organisation_idorganisation")
    private Organisation organisation;

    @NotNull
    @JsonIgnoreProperties(value = "category", allowSetters = true)
    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "category_idcategory")
    private Category category;

    public Race() {
    }

    public Race( @NotNull String name, @NotNull Organisation organisation, @NotNull Category category) {
        this.name = name;
        this.organisation = organisation;
        this.category = category;
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
