package com.example.cycling_knowledge.entity;


import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "staff_type")
public class StaffType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idstaff_type")
    private int id;

    @NotNull
    @Column(name = "staff_type")
    private String staffType;

    public StaffType() {
    }

    public StaffType(@NotNull String staffType) {
        this.staffType = staffType;
    }

    public int getId() {
        return id;
    }

    public String getStaffType() {
        return staffType;
    }

    public void setStaffType(String staffType) {
        this.staffType = staffType;
    }

    @Override
    public String toString() {
        return "StaffType{" +
                "id=" + id +
                ", staffType='" + staffType + '\'' +
                '}';
    }
}
