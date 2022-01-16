package com.example.cycling_knowledge.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "stage_city")
public class StageCity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idstage_city")
    private int id;

    @NotNull
    @Column(name = "is_start")
    private Boolean isStart;

    @NotNull
    @Column(name = "is_finish")
    private Boolean isFinish;

    @NotNull
    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "city_idcity")
    private City city;

    public StageCity() {
    }

    public StageCity(@NotNull Boolean isStart, @NotNull Boolean isFinish, @NotNull City city) {
        this.isStart = isStart;
        this.isFinish = isFinish;
        this.city = city;
    }

    public int getId() {
        return id;
    }

    public Boolean getStart() {
        return isStart;
    }

    public void setStart(Boolean start) {
        isStart = start;
    }

    public Boolean getFinish() {
        return isFinish;
    }

    public void setFinish(Boolean finish) {
        isFinish = finish;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    @Override
    public String toString() {
        return "StageCity{" +
                "id=" + id +
                ", isStart=" + isStart +
                ", isFinish=" + isFinish +
                ", city=" + city +
                '}';
    }
}
