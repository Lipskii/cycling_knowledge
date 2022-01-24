package com.example.cycling_knowledge.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Optional;

@Entity
@Table(name = "person")
public class Person implements Comparable<Person> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idperson")
    private int id;

    @NotNull
    @Column(name = "first_name")
    private String firstName;

    @NotNull
    @Column(name = "last_name")
    private String lastName;

    @NotNull
    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.REFRESH})
    @JsonIgnoreProperties("people")
    @JoinColumn(name = "gender_idgender")
    private Gender gender;

    @OneToOne(mappedBy = "person", cascade={CascadeType.REFRESH}, orphanRemoval = true) // , CascadeType.DETACH
    @JsonIgnore
    private Cyclist cyclist;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.REFRESH})
    @JsonIgnoreProperties({"people","cities"})
    @JoinColumn(name = "country_idcountry")
    private Country country;

    @NotNull
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;


    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.REFRESH})
    @JsonIgnoreProperties({"people"})
    @JoinColumn(name = "city_idcity")
    private City city;

    @Column(name = "photo")
    private String photo;


    public Person() {
    }

    public Person(String firstName, String lastName, Gender gender, Cyclist cyclist, LocalDate dateOfBirth, City city) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.cyclist = cyclist;
        this.dateOfBirth = dateOfBirth;
        this.city = city;
    }

    public int getId() { return id; }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Cyclist getCyclist() {
        return cyclist;
    }

    public void setCyclist(Cyclist cyclist) {
        this.cyclist = cyclist;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public Optional<String> getPhoto() {
        return Optional.ofNullable(photo);
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    @Override
    public int compareTo(Person o) {
        if(!this.lastName.equals(o.lastName)){
            return this.lastName.compareTo(o.lastName);
        }
        return this.firstName.compareTo(o.firstName);
    }

    @Override
    public String toString() {
        return "Person{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", gender=" + gender +
                ", cyclist=" + cyclist +
                ", dateOfBirth=" + dateOfBirth +
                ", city=" + city +
                '}';
    }
}
