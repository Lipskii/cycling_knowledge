package com.example.cycling_knowledge.entity;


import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "season")
public class Season {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idseason")
    private int id;

    @NotNull
    @Column(name = "season")
    private int season;

    public Season() {
    }

    public Season(@NotNull int season) {
        this.season = season;
    }

    public int getId() {
        return id;
    }

    public int getSeason() {
        return season;
    }

    public void setSeason(int season) {
        this.season = season;
    }

    @Override
    public String toString() {
        return "Season{" +
                "id=" + id +
                ", season=" + season +
                '}';
    }
}
