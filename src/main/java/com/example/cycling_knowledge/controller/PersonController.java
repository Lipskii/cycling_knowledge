package com.example.cycling_knowledge.controller;

import com.example.cycling_knowledge.entity.Person;
import com.example.cycling_knowledge.service.PersonService;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/api/people")
@org.springframework.web.bind.annotation.RestController
public class PersonController {
    private final PersonService personService;


    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }


    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<Person> getPeople(
            @And({
                    @Spec(path = "id", params = "id", spec = Equal.class),
                    @Spec(path = "firstName", params = "firstName", spec = Equal.class),
                    @Spec(path = "lastName", params = "lastName", spec = Equal.class),
                    @Spec(path = "gender.id", params = "genderId", spec = Equal.class),
                    @Spec(path = "country.id", params = "countryId", spec = Equal.class),
                    @Spec(path = "city.id", params = "cityId", spec = Equal.class),
            }) Specification<Person> spec) {
        return personService.get(spec, Sort.by("lastName"));
    }

    @PostMapping("")
    public Person addPerson(@RequestBody Person person) {
        System.out.println(person);
        personService.save(person);
        return person;
    }

    @PostMapping(
            value = "/photo/{personId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces=  MediaType.APPLICATION_JSON_VALUE
    )
    public void uploadPersonPhoto(@RequestParam("file") MultipartFile file, @PathVariable("personId") int personId)
            throws ResourceNotFoundException {

        personService.uploadPersonPhoto(file,personId);

    }

    @GetMapping(value = "/photo/{personId}")
    public byte[] downloadPersonPhoto(@PathVariable("personId") int personId) {
        return personService.downloadPersonImage(personId);
    }

    @PutMapping("/{personId}")
    public Person updatePerson(@RequestBody Person person, @PathVariable("personId") int personId) {

        personService.updatePerson(person,personId);

        return person;
    }
}
