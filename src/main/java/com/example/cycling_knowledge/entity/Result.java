package com.example.cycling_knowledge.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "Result")
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idresult")
    private int id;

    @NotNull
    @Column(name = "ranking")
    private int rank;

    @NotNull
    @Column(name = "stage_time")
    private int time;

    @ManyToOne(cascade = {CascadeType.DETACH,  CascadeType.REFRESH})
    @JsonIgnoreProperties(value = "results", allowSetters = true)
    @JoinColumn(name = "cyclist_idcyclist")
    private Cyclist cyclist;

    @ManyToOne(cascade = {CascadeType.DETACH,  CascadeType.REFRESH})
    @JsonIgnoreProperties(value = "results", allowSetters = true)
    @JoinColumn(name = "stage_idstage")
    private Stage stage;

    public Result(@NotNull int rank, @NotNull int time, Cyclist cyclist, Stage stage) {
        this.rank = rank;
        this.time = time;
        this.cyclist = cyclist;
        this.stage = stage;
    }

    public Result() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public Stage getStage() {
        return stage;
    }

    public void setStage(Stage stage) {
        this.stage = stage;
    }

    public Cyclist getCyclist() {
        return cyclist;
    }

    public void setCyclist(Cyclist cyclist) {
        this.cyclist = cyclist;
    }


    @Override
    public String toString() {
        return "Result{" +
                "id=" + id +
                ", rank=" + rank +
                ", time=" + time +
                ", cyclist=" + cyclist +
                ", stage=" + stage +
                '}';
    }
}
