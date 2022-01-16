package com.example.cycling_knowledge.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "stage")
public class Stage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idstage")
    private int id;

    @Column(name = "number")
    private int number;

    @Column(name = "date")
    private LocalDate date;

    @ManyToOne(cascade = {CascadeType.DETACH,  CascadeType.REFRESH})
    @JsonIgnoreProperties(value = "stageList", allowSetters = true)
    @JoinColumn(name = "race_idrace")
    private Race race;

    @ManyToOne(cascade = {CascadeType.DETACH,  CascadeType.REFRESH})
    @JsonIgnoreProperties(value = "stageList", allowSetters = true)
    @JoinColumn(name = "cyclist_idcyclist")
    private Cyclist cyclist;

    @ManyToOne(cascade = {CascadeType.DETACH,  CascadeType.REFRESH})
    @JsonIgnoreProperties(value = "stageList", allowSetters = true)
    @JoinColumn(name = "season_idseason")
    private Season season;

    public Stage() {
    }

    public Stage(int number, LocalDate date, Race race, Cyclist cyclist, Season season) {
        this.number = number;
        this.date = date;
        this.race = race;
        this.cyclist = cyclist;
        this.season = season;
    }

    public int getId() {
        return id;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Race getRace() {
        return race;
    }

    public void setRace(Race race) {
        this.race = race;
    }

    public Cyclist getCyclist() {
        return cyclist;
    }

    public void setCyclist(Cyclist cyclist) {
        this.cyclist = cyclist;
    }

    public Season getSeason() {
        return season;
    }

    public void setSeason(Season season) {
        this.season = season;
    }

    @Override
    public String toString() {
        return "Stage{" +
                "id=" + id +
                ", number=" + number +
                ", date=" + date +
                ", race=" + race +
                ", cyclist=" + cyclist +
                ", season=" + season +
                '}';
    }
}
