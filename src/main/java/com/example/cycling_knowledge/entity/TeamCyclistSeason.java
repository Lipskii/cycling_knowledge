package com.example.cycling_knowledge.entity;

import javax.persistence.*;

@Entity
@Table(name = "team_cyclist_season")
public class TeamCyclistSeason {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idteam_cyclist_season")
    private int id;

    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "cyclist_idcyclist")
    private Cyclist cyclist;

    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "team_idteam")
    private Team team;

    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "season_idseason")
    private Season season;

    public TeamCyclistSeason() {
    }

    public TeamCyclistSeason(Cyclist cyclist, Team team, Season season) {
        this.cyclist = cyclist;
        this.team = team;
        this.season = season;
    }

    public int getId() {
        return id;
    }

    public Cyclist getCyclist() {
        return cyclist;
    }

    public void setCyclist(Cyclist cyclist) {
        this.cyclist = cyclist;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Season getSeason() {
        return season;
    }

    public void setSeason(Season season) {
        this.season = season;
    }

    @Override
    public String toString() {
        return "TeamCyclistSeason{" +
                "id=" + id +
                ", cyclist=" + cyclist +
                ", team=" + team +
                ", season=" + season +
                '}';
    }
}

