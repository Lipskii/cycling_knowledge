package com.example.cycling_knowledge.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "cyclist")
public class Cyclist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idcyclist")
    private int id;

    @OneToOne(cascade = { CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "person_idperson")
    private Person person;

    @Column(name = "uci_code")
    private int uciCode;

    @Column(name = "is_active")
    private Boolean isActive;

    @JsonIgnoreProperties(value = "cyclist", allowSetters = true)
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "cyclist")
    private List<TeamCyclistSeason> teamCyclistSeasons;

    public Cyclist() {
    }

    public Cyclist(Person person, int uciCode, Boolean isActive) {
        this.person = person;
        this.uciCode = uciCode;
        this.isActive = isActive;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public int getUciCode() {
        return uciCode;
    }

    public void setUciCode(int uciCode) {
        this.uciCode = uciCode;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public void setTeamCyclistSeasons(List<TeamCyclistSeason> teamCyclistSeasons) {
        this.teamCyclistSeasons = teamCyclistSeasons;
    }

    public List<TeamCyclistSeason> getTeamCyclistSeasons() {
        return teamCyclistSeasons;
    }

    @Override
    public String toString() {
        return "Cyclist{" +
                "id=" + id +
                ", person=" + person +
                ", uciCode=" + uciCode +
                ", isActive=" + isActive +
                '}';
    }
}
