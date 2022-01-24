package com.example.cycling_knowledge.service;

import com.example.cycling_knowledge.bucket.BucketName;
import com.example.cycling_knowledge.entity.Country;
import com.example.cycling_knowledge.entity.Person;
import com.example.cycling_knowledge.filestore.FileStore;
import com.example.cycling_knowledge.repository.PersonRepository;
import org.apache.http.entity.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.*;
import java.util.logging.Logger;

@Service
public class PersonService implements ServiceInterface {
    private final PersonRepository personRepository;
    protected final Logger log = Logger.getLogger(getClass().getName());
    private final FileStore fileStore;

    @Autowired
    public PersonService(PersonRepository personRepository, FileStore fileStore) {
        this.personRepository = personRepository;
        this.fileStore = fileStore;
    }

    @Override
    public List<Person> findAll() {
        return personRepository.findAll();
    }

    public List<Person> get(Specification<Person> spec, Sort sort){
        return personRepository.findAll(spec,sort);
    }

    @Override
    public Optional<Person> findById(int id) {
        return personRepository.findById(id);
    }

    @Override
    public Person save(Object obj) {
        return personRepository.save((Person) obj);
    }

    @Override
    public void deleteById(int id) {
        personRepository.deleteById(id);
    }


    public void uploadPersonPhoto(MultipartFile file, int personId) {

        isFileEmpty(file);

        //check if file is an image
        isImage(file);

        Person person = getPersonOrThrow(personId);

        //Grab some metadata from file if any
        Map<String, String> metadata = extractMetadata(file);

        //Store the image in s3 and update database (userProfileImageLink) with s3 image link
        String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(), person.getId());
        String filename = String.format("%s-%s", file.getOriginalFilename(), UUID.randomUUID());

        try {
            fileStore.save(path, filename, Optional.of(metadata), file.getInputStream());
            person.setPhoto(filename);
            personRepository.save(person);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    @Transactional
    public void updatePerson(Person person, int personId) {
        if (personRepository.findById(personId).isPresent()) {
            person.setId(personId);
            personRepository.save(person);
        } else {
            throw new ResourceNotFoundException("No person found for id: " + personId);
        }
    }

    public byte[] downloadPersonImage(int personId) {
        Person person = getPersonOrThrow(personId);

        String path = String.format("%s/%s",
                BucketName.PROFILE_IMAGE.getBucketName(),
                person.getId());

        return person.getPhoto()
                .map(key -> fileStore.download(path, key))
                .orElse(new byte[0]);

    }

    private Map<String, String> extractMetadata(MultipartFile file) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));
        return metadata;
    }

    private Person getPersonOrThrow(int personId) {
        return personRepository.findById(personId).orElseThrow(() -> new ResourceNotFoundException("No person found for id " + personId));
    }

    private void isImage(MultipartFile file) {
        if(!Arrays.asList(
                ContentType.IMAGE_JPEG.getMimeType(),
                ContentType.IMAGE_PNG.getMimeType(),
                ContentType.IMAGE_GIF.getMimeType()).contains(file.getContentType())){
            throw new IllegalStateException("File must be an image" + file.getContentType());
        }
    }

    private void isFileEmpty(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalStateException("Cannot upload empty file [ " + file.getSize() + "]");
        }
    }
}
