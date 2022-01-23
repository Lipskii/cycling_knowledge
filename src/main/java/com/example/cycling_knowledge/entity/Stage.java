package com.example.cycling_knowledge.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.math.BigDecimal;
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
    @JoinColumn(name = "season_idseason")
    private Season season;

    @Column(name = "start_city")
    private String startCity;

    @Column(name = "finish_city")
    private String finishCity;

    @Column(name = "distance")
    private BigDecimal distance;

    public Stage() {
    }

    public Stage(int number, LocalDate date, Race race, Season season, String startCity, String finishCity, BigDecimal distance) {
        this.number = number;
        this.date = date;
        this.race = race;
        this.season = season;
        this.startCity = startCity;
        this.finishCity = finishCity;
        this.distance = distance;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public Season getSeason() {
        return season;
    }

    public void setSeason(Season season) {
        this.season = season;
    }

    public String getStartCity() {
        return startCity;
    }

    public void setStartCity(String stageCity) {
        this.startCity = stageCity;
    }

    public String getFinishCity() {
        return finishCity;
    }

    public void setFinishCity(String finishCity) {
        this.finishCity = finishCity;
    }

    public BigDecimal getDistance() {
        return distance;
    }

    public void setDistance(BigDecimal distance) {
        this.distance = distance;
    }

    @Override
    public String toString() {
        return "Stage{" +
                "id=" + id +
                ", number=" + number +
                ", date=" + date +
                ", race=" + race +
                ", season=" + season +
                ", stageCity='" + startCity + '\'' +
                ", finishCity='" + finishCity + '\'' +
                ", distance=" + distance +
                '}';
    }
}
